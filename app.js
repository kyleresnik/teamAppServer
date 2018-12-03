require('dotenv').config(); 
var express = require('express'); 
var app = express(); 

const book = require ('./controllers/bookcontroller')

const sequelize = require ('./db');
const bodyParser = require('body-parser'); 

sequelize.sync();
app.use(bodyParser.json()); 

app.use(require('./middleware/headers')); 

app.use('/books', book);

app.listen(3000, function(){
    console.log('App is listening on 3000.') 
});