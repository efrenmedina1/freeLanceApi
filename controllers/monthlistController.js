var router = require('express').Router();
var sequelize = require('../db');
var db = require('../db').db;


router.get('/', (req, res) => {
    db.Month.findAll()
    .then(months => res.status(200).json(months))
    .catch(err => res.status(500).json(err))
});

router.get('/search/:id', (req, res)=> {
    var data = req.params.id;

    db.Month
    .findAll({
        where: { month: data }
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