/**
 * Created by ruan0408 on 12/2/17.
 */

let checkUserLoggedIn = require('../helpers/checkUserLoggedIn');

// function checkAuthentication (req, res, next) {
//     let token = req.body.token || req.query.token || req.headers['access-token'];
//
//     checkUserLoggedIn(token)
//         .then(isUserLoggedIn => {
//             if (isUserLoggedIn) {
//                 req.session.userId =
//                 next();
//             }
//             else next(new Error('UnauthenticatedUserError'));
//         })
//         .catch(err => next(err));
// }

function checkAuthentication (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['access-token'];

    checkUserLoggedIn(token)
        .then(user => {
            if (user) {
                console.log(user._id);
                req.user = user;
                next();
            }
            else next(new Error('UnauthenticatedUserError'));
        })
        .catch(err => next(err));
}

module.exports = checkAuthentication;