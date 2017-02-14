/**
 * Created by ruan0408 on 14/02/17.
 */
let jwt = require('jsonwebtoken');
let config = require('../config');
let User = require('../models/user');

function checkUserLoggedIn (token, callback) {
    jwt.verify(token, config.secret, handleTokenResponse, callback);
}

function handleTokenResponse (err, decodedUser, callback) {
    if (err) {
        console.log(err);
        return response.json({ success: false, message: 'Failed to authenticate token.' });
    }

    User.findOne({username: decodedUser.username}, handleUser, callback);
}

function handleUser (err, user, callback) {
    if (err) return console.log(err);
    if (!user)  return response.json({success: false, message: 'Token doesnt correspond to a known user'});

    console.log('rola em algum lugar '+ user === null);
    // callback(err, (user === null));
}

module.exports = checkUserLoggedIn;