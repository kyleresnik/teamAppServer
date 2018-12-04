const Sequelize = require('sequelize');
const sequelize = new Sequelize('savepoint', 'postgres', 'GundamMeister0703', {
    host: 'localhost',
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('SUCCESS MESSAGE GOES HERE');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = sequelize;