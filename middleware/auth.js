/**
 * Created by ruan0408 on 12/2/17.
 */

let checkUserLoggedIn = require('../helpers/checkUserLoggedIn');

function checkAuthentication (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['access-token'];

    checkUserLoggedIn(token)
        .then(isUserLoggedIn => {
            if (isUserLoggedIn) next();
            else next(new Error('UnauthenticatedUserError'));
        })
        .catch(err => next(err));
}

module.exports = checkAuthentication;