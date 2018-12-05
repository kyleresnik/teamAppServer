module.exports = function(sequelize, DataTypes) {
    return sequelize.define('profile' , {
        owner_id: {
            type: DataTypes.INTEGER,
        },
        owner_username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING
        },

        // image: {
        //     type: DataTypes.BLOB
        // }
    });
};