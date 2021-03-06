/**
 * Created by ruan0408 on 17/02/17.
 */

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');

let config = require('./config');

let apiRouter = require('./routes/api');
let authRouter = require('./routes/auth');
let usersRouter = require('./routes/users');
let protectedRouter = require('./routes/protected');
let authMiddleware = require('./middleware/auth');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Token");
    res.header("Access-Control-Expose-Headers", "Access-Token");
    next();
});

app.use('/auth', authRouter);
app.use('/api', apiRouter);

// bypass the registration routing
apiRouter.use('/users', usersRouter);

// from here on, the routes will be protected
apiRouter.use(authMiddleware);
apiRouter.use('/protected', protectedRouter);

app.use(function (err, req, res, next) {
    console.log(err);
    res.end();
});

module.exports = app;
