/**
 * Created by ruan0408 on 12/2/17.
 */

let checkUserLoggedIn = require('../helpers/checkUserLoggedIn');

function checkAuthentication (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['access-token'];

    checkUserLoggedIn(token)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => next(err));
}

module.exports = checkAuthentication;