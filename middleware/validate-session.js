require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../db')
const User = sequelize.import('../models/user');

const validateSession = function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next()
    } else {
        let token = req.headers.authorization;
        if (!token) return res.status(403).send({ auth: false, message: 'No token provided!'});
        else {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (decoded){
                    User.findOne({where: {id: decoded.id }}).then(user => {
                        req.user = user;
                        next();
                    },
                    function(){
                        res.status(401).send({error: 'Authorization required!'});
                    });
                } else {
                    res.status(400).send({error: 'Authorization required!'})
                }
            })
        }
    }
}

module.exports = validateSession;