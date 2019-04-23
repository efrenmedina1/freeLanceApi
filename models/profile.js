module.exports = function (sequelize, DataTypes) {
    return sequelize.define('profile', {
        name: DataTypes.STRING,
        background: DataTypes.STRING,
        about: DataTypes.STRING,
        picture: DataTypes.STRING,
    });
};