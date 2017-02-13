var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var authMiddleware = require('./middleware/auth');
var config = require('./config');

var setUpPassport = require("./passportsetup");

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.set('port', process.env.PORT || 3000);
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

setUpPassport(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', authRouter);
app.use('/api', apiRouter);
apiRouter.use('/users', usersRouter);

// bypass the registration routing
apiRouter.use(authMiddleware);

app.listen(app.get('port'), function () {
    console.log('WE ARE LISTENING');
});