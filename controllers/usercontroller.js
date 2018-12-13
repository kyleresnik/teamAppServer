// IMPORTS
require('dotenv').config();
const router = require('express').Router();
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = sequelize.import('../models/user');
// const Profile = sequelize.import('../models/profile');
// const validateSession = require('../middleware/validate-session');


// CREATE NEW USER
router.post('/signup', function(req, res){
  const firstName = req.body.user.firstName;
  const lastName = req.body.user.lastName;
  const username = req.body.user.username;
  const pass = req.body.user.password;

  User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: bcrypt.hashSync(pass, 10)
  }).then(
    function createSuccess(user){
      let sessionToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
      res.json({
        user: user,
        message: 'created',
        sessionToken: sessionToken
      });
    },
    function createError(err){
      res.send(500, err.message);
    }
  );
});


// SIGN IN FOR EXISTING USER
router.post('/signin', function(req, res){
  User.findOne( { where: { username: req.body.user.username } } ).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
          if (matches) {
            let sessionToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
            res.json({
              user: user,
              message: "Successfully Authenticated!",
              sessionToken: sessionToken
            });
          } else {
            res.status(502).send({ error: "Authentication Failed" });
          }
        });
      } else {
        res.status(500).send({ error: "Internal Server Error" });
      }
    },
    function(err) {
      res.status(501).send({ error: "Not Implemented" });
    }
  );
});

// router.get('/userlist/:id', (req,res)=>{
//   Profile.findAll({where:{userId:req.params.id}})
//   .then(profilelist => res.status(200).json(profilelist))
// })

// // CREATE USER PROFILE
// router.put('/profile/:id', validateSession, (req, res) => {
//   User.findOne({ where: { id: req.params.id }})
//   .then(user => { user.createProfile ({
//     userId: user.id,
//     bio: req.body.bio,
//     twHandle: req.body.twHandle,
//     fbUrl: req.body.fbUrl
//   })})
//   .then(profile => res.json(profile))
// })


// UPDATE A USER
// router.put('/:id', validateSession)

module.exports = router;