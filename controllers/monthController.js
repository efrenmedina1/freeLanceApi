var router = require('express').Router();
var sequelize = require('../db');
var db = require('../db').db;




router.post('/', (req, res) => {
    var userId = req.user.id;
    var monthData = {
        month: req.body.month,
        day1: req.body.day1,
        day2: req.body.day2,
        day3: req.body.day3,
        day4: req.body.day4,
        day5: req.body.day5,
        day6: req.body.day6,
        day7: req.body.day7,
        day8: req.body.day8,
        day9: req.body.day9,
        day10: req.body.day10,
        day11: req.body.day11,
        day12: req.body.day12,
        day13: req.body.day13,
        day14: req.body.day14,
        day15: req.body.day15,
        day16: req.body.day16,
        day17: req.body.day17,
        day18: req.body.day18,
        day19: req.body.day19,
        day20: req.body.day20,
        day21: req.body.day21,
        day22: req.body.day22,
        day23: req.body.day23,
        day24: req.body.day24,
        day25: req.body.day25,
        day26: req.body.day26,
        day27: req.body.day27,
        day28: req.body.day28,
        day29: req.body.day29,
        day30: req.body.day30,
        day31: req.body.day31,
        day32: req.body.day32,
        day33: req.body.day33,
        day34: req.body.day34,
        day35: req.body.day35,
        day36: req.body.day36,
        day37: req.body.day37,
        day38: req.body.day38,
        day39: req.body.day39,
        day40: req.body.day40,
        day41: req.body.day41,
        day42: req.body.day42,




        userId: userId
    }
    db.Month
    .create(monthData)
    .then(
        function createSuccess(monthData) {
            res.json({
                monthData: monthData
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

    db.Month
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

router.delete('/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    db.Month
    .destroy({
        where: {id: data, userId: userid}
    }).then(
        function deleteMonthSuccess(data){
            res.send("you deleted a Month");
        },
        function deleteMonthError(err){
            res.send(500, err.message);
        }
    );
});

router.put('/:id', (req, res) => {
    if (!req.errors) {
        db.Month.update(req.body, { where: { id: req.params.id }})
        .then(monthdata => res.status(200).json(monthdata))
        .catch(err => res.json(req.errors))
    } else {
      res.status(500).json(req.errors)
    }
  })


module.exports = router;