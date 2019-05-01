var router = require('express').Router();
var sequelize = require('../db');
var db = require('../db').db;

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





module.exports = router;