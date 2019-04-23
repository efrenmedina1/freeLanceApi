module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first: {
            type: DataTypes.STRING,
        },
        last: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        }
    });
};