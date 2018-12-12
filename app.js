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
sequelize.sync();
app.use(bodyParser.json()); 

//EXPOSED ROUTES
app.use('/user', user);
app.use(require('./middleware/headers'));

app.use(require('./middleware/validate-session'));
app.use('/profile', profile);
app.use('/post', post);

app.listen(3000, function(){
    console.log('App is listening on 3000.') 
});

// //IMPORTS
// require('dotenv').config();
// const express = require('express'); 
// const app = express();
// const sequelize = require('./db');

// // app.use(require('cors')())
// app.use(require('body-parser').json())
// // require('./models')


// //CONTROLLERS
// const user = require('./controllers/usercontroller');
// const post = require('./controllers/postcontroller');
// const profile = require('./controllers/profilecontroller');

// //MIDDLEWARE
// sequelize.sync();
// app.use(require('./middleware/headers'));
// app.use(bodyParser.json());
// app.use(express.static(__dirname));

// // //EXPOSED ROUTES
// app.use('/user', user);

// // //VALIDATED ROUTES
// app.use('/post', post);
// app.use('/profile', profile);


// app.listen(process.env.PORT, function() {
//     console.log(`Server is listening on ${process.env.PORT}.`); 
// });
