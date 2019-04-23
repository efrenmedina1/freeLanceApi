var router = require('express').Router();
var sequelize = require('../db');
// var ReplyModel = sequelize.import('../models/reply');
var db = require('../db').db;


router.post('/', (req, res) => {
    var userId = req.user.id;
    var conversationId = req.body.conversationId;
    var replyData = {
        message: req.body.message,
        conversationId: conversationId,
        userId: userId,
        email: req.body.username,
        
    }
    db.Message
    .create(replyData)
    .then(
        function createSuccess(replyData) {
            res.json({
                replyData: replyData
            });
        },
        function createError(err) {
            res.status(500).send(err.message);
        }
    );
});

router.get('/:id', (req, res)=> {
    var data = req.params.id;
    var userid = req.user.id;

    db.Message
    .findOne({
        where: { id: data, userId: userid }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});

router.delete('/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    db.Message
    .destroy({
        where: {id: data, userId: userid}
    }).then(
        function deleteMonthSuccess(data){
            res.send("you deleted a reply");
        },
        function deleteMonthError(err){
            res.send(500, err.message);
        }
    );
});

router.put('/:id', (req, res) => {
    if (!req.errors) {
        db.Message.update(req.body, { where: { id: req.params.id }})
        .then(replydata => res.status(200).json(replydata))
        .catch(err => res.json(req.errors))
    } else {
      res.status(500).json(req.errors)
    }
  })

module.exports = router;
