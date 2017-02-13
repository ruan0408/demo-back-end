/**
 * Created by ruan0408 on 09/02/17.
 */

var express = require('express');

var User = require('../models/user');
var usersRouter = express.Router();

usersRouter.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) return console.log(err);
        res.send(users);
    });
});

usersRouter.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var user = new User({username: username, password: password});
    user.save(function (err, user) {
        if (err) return console.log(err);
        console.log(user.username + ' saved');
        res.send(user);
    });
});

module.exports = usersRouter;
