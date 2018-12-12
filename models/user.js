module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user' , {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args:5,
                    msg: "Password must be a minimum of 5 characters"
                }
            }
        }
    });

    User.associate = models => {
        User.hasMany(models['post'])
    }

    return User;
};