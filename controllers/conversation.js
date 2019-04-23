var router = require('express').Router();
var sequelize = require('../db');
var db = require('../db').db;


router.get('/', (req, res) => {
    var userid = req.user.id;

    db.Conversation
    .findAll({
        where: {userId: userid}
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

router.get('/:id', (req, res)=> {
    var data = req.params.id;
    
    db.Conversation
    .findOne({
        where: { id: data }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/', (req, res) => {
    var userId = req.user.id;
    var name = req.user.first;
    var conversationData = {
        user1: userId,
        user2: req.body.user2, 
        username1: name,
        username2: req.body.username2,
    }
    db.Conversation
    .create(conversationData)
    .then(
        function createSuccess(conversationData) {
            res.json({
                conversationData: conversationData
            });
        },
        function createError(err) {
            res.status(500).send(err.message);
        }
    );
});

router.delete('/:id', (req, res) => {
    db.Conversation
    .destroy({ where: { id: req.params.id} })
    .then(
        function deleteConversationSuccess(data){
            res.send("you deleted a conversation");
        },
        function deleteConversationError(err){
            res.send(500, err.message);
        }
    );
})

router.put('/:id', (req, res) => {
    if (!req.errors) {
        db.Conversation.update(req.body, { where: { id: req.params.id }})
        .then(conversationdata => res.status(200).json(conversationdata))
        .catch(err => res.json(req.errors))
    } else {
      res.status(500).json(req.errors)
    }
  })


module.exports = router;
