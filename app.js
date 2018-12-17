//IMPORTS
require('dotenv').config();
var express = require('express'); 
var app = express(); 
const sequelize = require ('./db');
const bodyParser = require('body-parser');

//CONTROLLERS
const user = require('./controllers/usercontroller')
const profile = require('./controllers/profilecontroller')
const post = require('./controllers/postcontroller')

//MIDDLEWARE
sequelize.sync(); // {force: true}
app.use(bodyParser.json());
app.use(require('./middleware/headers')); 

//EXPOSED ROUTES
app.use('/user', user);

//PROTECTED ROUTES
app.use('/post', post);
app.use('/profile', profile);

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`) 
});