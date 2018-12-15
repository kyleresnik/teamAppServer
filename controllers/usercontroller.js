// IMPORTS
require('dotenv').config();
const router = require('express').Router();
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = sequelize.import('../models/user');
// const Profile = sequelize.import('../models/profile');
// const validateSession = require('../middleware/validate-session');


router.get('/getall', (req, res) => {
  User.findAll()
      .then(post => res.status(200).json(post))
      .catch(err => res.status(500).json(err));
});

// CREATE NEW USER
router.post('/signup', function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const pass = req.body.password;
  const userRole = req.body.userRole;

  User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: bcrypt.hashSync(pass, 10),
    userRole: userRole
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
  User.findOne( { where: { username: req.body.username } } ).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, matches) {
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

module.exports = router;