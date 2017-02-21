/**
 * Created by ruan0408 on 09/02/17.
 */

let express = require('express');

let User = require('../models/user');
let usersRouter = express.Router();

usersRouter.get('/', function (req, res, next) {
    User.findAll()
        .then(users => res.send(users))
        .catch(err => next(err));
});

usersRouter.post('/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    User.create({username: username, password: password})
        .then(user => {
            console.log(`${user.username} saved`);
            res.send(user);
        })
        .catch(err => next(err));
});

module.exports = usersRouter;
