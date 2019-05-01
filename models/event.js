module.exports = function (sequelize, DataTypes) {
    return sequelize.define('event', {
        header: DataTypes.STRING,
        message: DataTypes.STRING,
        month: DataTypes.STRING,
        day: DataTypes.STRING,
    });
};