/**
 * Created by ruan0408 on 09/02/17.
 */

var express = require('express');
var config = require('../config');
var jwt = require('jsonwebtoken');

var app = express();
var usersRouter = require('./users');

var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;