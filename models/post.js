module.exports = function(sequelize, DataTypes) {
    return sequelize.define('post' , {
        owner_id: {
            type: DataTypes.INTEGER,
            
        },
        owner_username: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};