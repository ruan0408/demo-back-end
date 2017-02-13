/**
 * Created by ruan0408 on 10/02/17.
 */
var express = require('express');
var jwt    = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/user');

var authRouter = express.Router();

authRouter.post('/', function(req, res, next) {

    var user = new User({username: req.body.username, password: req.body.password});

    User.findOne({ username: user.username }, function (err, user) {
        if (err) {return res.send('authentication failed');}
        if (!user) {return res.send('username doesnt exist');}

        var token = jwt.sign({username: user.username, password: user.password}, config.secret, {
            expiresIn: 60*60*24 // expires in 24 hours
        });
        res.json({user: user, token: token});
    });

});

module.exports = authRouter;