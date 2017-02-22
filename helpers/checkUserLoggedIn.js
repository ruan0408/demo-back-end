/**
 * Created by ruan0408 on 14/02/17.
 */
let jwt = require('jsonwebtoken');
let config = require('../config');
let User = require('../models/user');

function checkUserLoggedIn(token) {
    return new Promise(resolve => {
        let decodedUser = jwt.verify(token, config.secret);
        resolve(User.findOne({ where: {username: decodedUser.username} }))
    })
        .then((user) => Promise.resolve(user))
        .catch(() => Promise.reject(new Error('UnauthenticatedUserError')));
}

module.exports = checkUserLoggedIn;