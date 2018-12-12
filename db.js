const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log('Successfully connected to savepoint!');
    })
    .catch(err => {
        console.error('Unable to connect to the savepoint database:', err);
    });

    const Post = sequelize.import('./models/post');


    const User = sequelize.import('./models/user');

    Post.belongsTo(User);
    User.hasMany(Post);


    
module.exports = sequelize;