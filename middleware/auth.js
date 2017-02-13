/**
 * Created by ruan0408 on 12/2/17.
 */

var config = require('../config');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function(err, decodedUser) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                User.findOne({username: decodedUser.username}, function (err, user) {
                    if (err || !user) return res.json({success: false, message: 'Token doesnt corresponde to a known user'});
                    else {
                        req.decoded = decodedUser;
                        next();
                    }
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};