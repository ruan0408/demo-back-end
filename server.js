/**
 * Created by ruan0408 on 17/02/17.
 */

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');

let config = require('./config/config');
let mainRouter = require('./routes/routes');

let app = express();

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


app.use(mainRouter);

module.exports = app;
