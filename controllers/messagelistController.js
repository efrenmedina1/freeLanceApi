var router = require('express').Router();
var sequelize = require('../db');
// var ReplyUPModel = sequelize.import('../models/reply');
var db = require('../db').db;


router.get('/:id', (req, res) => {
    var conversationid = req.params.id;

    db.Message
    .findAll({
        where: { conversationId: conversationid }
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

module.exports = router;