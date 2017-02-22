/**
 * Created by ruan0408 on 09/02/17.
 */

let express = require('express');

let User = require('../models/user');

let usersRouter = express.Router();

let respondIfNotLogged = require('../middleware/respondIfNotLogged');
let respondIfNotAdmin = require('../middleware/respondIfNotAdmin');

usersRouter.use(respondIfNotLogged);
usersRouter.use(respondIfNotAdmin);

usersRouter.get('/', function (req, res, next) {
    User.findAll()
        .then(users => res.send(users))
        .catch(err => next(err));
});

usersRouter.post('/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let isAdmin = req.body.admin;

    User.create({username: username, password: password, admin: isAdmin})
        .then(user => res.send(user))
        .catch(err => next(err));
});

module.exports = usersRouter;
