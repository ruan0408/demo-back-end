/**
 * Created by ruan0408 on 12/2/17.
 */

var config = require('../config');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var response;
var nextMiddleware;

function checkAuthentication (req, res, next) {
    response = res;
    nextMiddleware = next;

    var token = req.body.token || req.query.token || req.headers['access-token'];

    jwt.verify(token, config.secret, handleTokenResponse);

}

function handleTokenResponse (err, decodedUser) {
    if (err)
        return response.json({ success: false, message: 'Failed to authenticate token.' });

    User.findOne({username: decodedUser.username}, handleUser);
}

function handleUser (err, user) {
    if (err || !user)
        return response.json({success: false, message: 'Token doesnt correspond to a known user'});

    nextMiddleware();
}

module.exports = checkAuthentication;