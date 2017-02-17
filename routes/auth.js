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
    let myUser;
    User.findOne({ username: req.body.username })
        .then(user => {
            myUser = user;
            return user.checkPassword(req.body.password)
        })
        .then(() => handleSuccess(res, myUser))
        .catch(err => next(err))
});

function handleSuccess(res, user) {
    token = buildToken(user);
    res.set('Access-Token', token);
    res.json(user);
}

function buildToken(user) {
    return jwt.sign({username: user.username, password: user.password},
        config.secret,
        {expiresIn: 20}
    );
}

authRouter.get('/', function (req, res, next) {
    let token = req.query.token;
    checkUserLoggedIn(token)
        .then(isLoggedIn => res.json({isLoggedIn: isLoggedIn}))
        .catch(err => next(err));
});

module.exports = authRouter;