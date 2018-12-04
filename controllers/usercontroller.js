require('dotenv').config();
var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//Create user
router.post('/signup', function(req, res){
  var firstN = req.body.user.firstName;
  var lastN = req.body.user.lastName;
  var username = req.body.user.username;
  var pass = req.body.user.password;
  User.create({
    firstName: firstN,
    lastName: lastN,
    username: username,
    password: bcrypt.hashSync(pass, 10)
  }).then(
    function createSuccess(user){
      var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
      res.json({
        user: user,
        message: 'created',
        sessionToken: token
      });
    },
    function createError(err){
      res.send(500, err.message);
    }
  );
});

router.post('/signin', function(req, res){
  User.findOne( { where: { username: req.body.user.username } } ).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
          if (matches) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
            res.json({
              user: user,
              message: "Successfully Authenticated!",
              sessionToken: token
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