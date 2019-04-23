var jwt = require('jsonwebtoken');
var sequelize = require('../db').db
// var User = sequelize.import('../models/user');
var db = require('../db').db;

module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next()
    } else {
    var sessionToken = req.headers.authorization;
    console.log(sessionToken)
    if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
            if (decoded) {
                db.User.findOne({ where: { id: decoded.id } }).then(user => {
                    req.user = user;
                    next();
                },
                    function () {
                        res.status(401).send({ error: 'NOT AUTHORIZED' });
                    });
            } else {
                res.status(400).send({ error: 'STILL NOT AUTHORIZED' });
            }
        });
    }
    }
}