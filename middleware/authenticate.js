/**
 * Created by ruan0408 on 12/2/17.
 */

let isUserLogged = require('../helpers/isUserLogged');

function authenticate (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['access-token'];
    isUserLogged(token)
        .then(user => req.user = user)
        .catch(err => req.user = null)
        .then(() => next());
}

module.exports = authenticate;