var router = require('express').Router();
var sequelize = require('../db');
// var ReplyModel = sequelize.import('../models/reply');
var db = require('../db').db;


router.post('/', (req, res) => {
    var userId = req.user.id;
    var month = req.body.month;
    var day = req.body.day;
    var eventData = {
        header: req.body.header,
        message: req.body.message,
        month: month,
        day: day,
        userId: userId,
        
        
    }
    db.Event
    .create(eventData)
    .then(
        function createSuccess(eventData) {
            res.json({
                eventData: eventData
            });
        },
        function createError(err) {
            res.status(500).send(err.message);
        }
    );
});

router.get('/:month/:day', (req, res)=> {
    var month = req.params.month;
    var day = req.params.day;

    db.Event
    .findAll({
        where: { month: month, day: day}
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

    db.Event
    .destroy({
        where: {id: data, userId: userid}
    }).then(
        function deleteEventSuccess(data){
            res.send("you deleted a reply");
        },
        function deleteEventError(err){
            res.send(500, err.message);
        }
    );
});

router.put('/:id', (req, res) => {
    if (!req.errors) {
        db.Event.update(req.body, { where: { id: req.params.id }})
        .then(replydata => res.status(200).json(replydata))
        .catch(err => res.json(req.errors))
    } else {
      res.status(500).json(req.errors)
    }
  })

module.exports = router;
