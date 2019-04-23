var router = require('express').Router();
var sequelize = require('../db');
var db = require('../db').db;


router.get('/', (req, res) => {
    db.Conversation.findAll()
    .then(conversation => res.status(200).json(conversation))
    .catch(err => res.status(500).json(err))
});

module.exports = router;