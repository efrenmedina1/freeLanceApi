var express = require('express')
var router = express.Router()
var db = require('../db').db;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res) {
    var email = req.body.user.email;
    var pass = req.body.user.password; 
    var first = req.body.user.first;
    var last = req.body.user.last;
    var role = req.body.user.role;

    db.User.create({
        email: email,
        passwordhash: bcrypt.hashSync(pass, 10),
        first: first,
        last: last,
        role: role,

    }).then(
        function createSuccess(user){
            var token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.json({
            user: user,
            message: 'created',
            sessionToken: token
        });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/login', (req, res) => {
    db.User.findOne({ where: {email: req.body.user.email}})
    .then(
        user =>  {
            if (user) {
              bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                  if (matches) {
                      var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}); 
                      res.json({
                          user: user,
                          message: "successfully authenticated",
                          sessionToken: token
                      });
                  } else {
                      res.status(502).send({ error: "You failed to login"})
                  }
              });  
            } else {
                res.status(500).send({error: "failed to authenticate"});
            }
        },
        function (err) {
            res.status(501).send({ error: "You failed" });
        }
    );
});


module.exports = router;