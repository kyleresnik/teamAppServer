//IMPORTS
require('dotenv').config(); 
var express = require('express'); 
var app = express(); 
const sequelize = require ('./db');
const bodyParser = require('body-parser');

//CONTROLLERS
const user = require('./controllers/usercontroller');
const post = require('./controllers/postcontroller');
const profile = require('./controllers/profilecontroller');

//MIDDLEWARE
sequelize.sync();
app.use(bodyParser.json()); 

//EXPOSED ROUTES
app.use('/user', user);
app.use('/post', post);
app.use('/profile', profile);
app.use(require('./middleware/headers')); 

app.listen(3000, function(){
    console.log('App is listening on 3000.'); 
});