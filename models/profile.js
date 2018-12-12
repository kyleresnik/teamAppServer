module.exports = function(sequelize, DataTypes) {
    const Profile = sequelize.define('profile' , {
        userId: {
            type: DataTypes.INTEGER
        },
        bio: {
            type: DataTypes.STRING
        },
        twHandle: {
            type: DataTypes.STRING
        },
        fbUrl: {
            type: DataTypes.STRING
        }
    });

    return Profile;
};