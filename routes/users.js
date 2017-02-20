/**
 * Created by ruan0408 on 09/02/17.
 */

let express = require('express');
let acl = require('acl');

let User = require('../models/user');
let usersRouter = express.Router();

usersRouter.get('/', function (req, res) {
    User.find((err, users) => {
        if (err) return console.log(err);
        res.send(users);
    });
});

usersRouter.post('/', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let user = new User({username: username, password: password});
    user.save(function (err, user) {
        if (err) return console.log(err);
        console.log(user.username + ' saved');
        res.send(user);
    });
});

module.exports = usersRouter;
