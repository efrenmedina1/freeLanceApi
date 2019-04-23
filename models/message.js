module.exports = function (sequelize, DataTypes) {
    return sequelize.define('message', {
        message: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        conversationId: DataTypes.INTEGER,
        name: DataTypes.STRING,
    });
};