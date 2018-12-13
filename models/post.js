module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post' , {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Post.associate = (models => {
        Post.belongsTo(models['user'])
    })

    return Post;
};