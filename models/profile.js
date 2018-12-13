module.exports = function(sequelize, DataTypes) {
    const Profile = sequelize.define('profile' , {
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