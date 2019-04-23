var router = require('express').Router();
var sequelize = require('../db');
// var ProfileModel = sequelize.import('../models/profile');
var db = require('../db').db;


router.get('/', (req, res) => {
    var userid = req.user.id;

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

router.get('/:id', (req, res)=> {
    var data = req.params.id;
    
    db.Profile
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
    var profileData = {
        name: req.body.name,
        background: req.body.background,
        about: req.body.about,
        picture: req.body.picture,
        userId: userId
    }
    db.Profile
    .create(profileData)
    .then(
        function createSuccess(profileData) {
            res.json({
                profileData: profileData
            });
        },
        function createError(err) {
            res.status(500).send(err.message);
        }
    );
});

router.delete('/:id', (req, res) => {
    db.Profile
    .destroy({ where: { id: req.params.id} })
    .then(
        function deleteProfileSuccess(data){
            res.send("you deleted a profile");
        },
        function deleteProfileError(err){
            res.send(500, err.message);
        }
    );
})

router.put('/:id', (req, res) => {
    if (!req.errors) {
        db.Profile.update(req.body, { where: { id: req.params.id }})
        .then(profiledata => res.status(200).json(profiledata))
        .catch(err => res.json(req.errors))
    } else {
      res.status(500).json(req.errors)
    }
  })


module.exports = router;