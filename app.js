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
sequelize.sync({force: true}); // {force: true}
app.use(bodyParser.json());
app.use(require('./middleware/headers')); 

//EXPOSED ROUTES
app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/profile', profile);
app.use('/post', post);

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`) 
});