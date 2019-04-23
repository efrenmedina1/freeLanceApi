var router = require('express').Router();
var sequelize = require('../db');
// var ProfileModel = sequelize.import('../models/profile');
var db = require('../db').db;


router.get('/', (req, res) => {
    db.Profile.findAll()
    .then(profiles => res.status(200).json(profiles))
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
    var userid = req.params.id;

    db.Profile
    .findAll({
        where: { userId: userid }
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