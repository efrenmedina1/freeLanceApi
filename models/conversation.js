module.exports = function (sequelize, DataTypes) {
    return sequelize.define('conversation', {
        user1: DataTypes.STRING,
        user2: DataTypes.STRING,
        username1: DataTypes.STRING,
        username2: DataTypes.STRING,
    })
}