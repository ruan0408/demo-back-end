/**
 * Created by ruan0408 on 10/02/17.
 */
let express = require('express');
let jwt = require('jsonwebtoken');
let config = require('../config');
let User = require('../models/user');

let checkUserLoggedIn = require('../helpers/checkUserLoggedIn');

let authRouter = express.Router();

authRouter.post('/', function(req, res, next) {

    var user = new User({username: req.body.username, password: req.body.password});

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {return res.send('authentication failed');}
        if (!user) {return res.send('username doesnt exist');}

        user.checkPassword(req.body.password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) {
                return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            token = jwt.sign({
                username: user.username,
                password: user.password
            }, config.secret, {
                expiresIn: 60*60 // expires in 10 seconds
            });

            res.set('Access-Token', token);
            res.json(user);
        });
    });

});

authRouter.get('/', function (req, res, next) {
    let token = req.query.token;
    checkUserLoggedIn(token, handleResponse(res));
    console.log('terminei o get ' + token);
});

function handleResponse(res) {
    console.log('executei a função externa');

    return function (err, isLoggedIn) {
        console.log('AUEHAUHEUAHEUHEUA');
        if (err) {
            console.log(err);
            return res.json({status: 'an error occurred'});
        }
        res.json({status: isLoggedIn});
    }
}

module.exports = authRouter;