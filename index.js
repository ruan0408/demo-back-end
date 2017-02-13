var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var config = require('./config');

var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var protectedRouter = require('./routes/protected');
var authMiddleware = require('./middleware/auth');

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.set('port', process.env.PORT || 3000);
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

app.use('/auth', authRouter);
app.use('/api', apiRouter);

// bypass the registration routing
apiRouter.use('/users', usersRouter);

// from here on, the routes you be protected
apiRouter.use(authMiddleware);
apiRouter.use('/protected', protectedRouter);

app.listen(app.get('port'), function () {
    console.log('WE ARE LISTENING');
});