/**
 * Created by ruan0408 on 10/02/17.
 */
var express = require('express');
var passport = require('passport');
var jwt    = require('jsonwebtoken');
var config = require('../config');

var app = express();
var loginRouter = express.Router();

loginRouter.post('/login', function(req, res, next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({bla: 'NAO ROLOU'}); }
        // return res.send({bla: 'ROLOU'})
        var token = jwt.sign({username: user.username, password: user.password}, config.secret, {
            expiresIn: 60*60*24 // expires in 24 hours
        });

        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    })(req, res, next);
});

module.exports = loginRouter;