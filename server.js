/**
 * Created by ruan0408 on 17/02/17.
 */

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let acl = require('acl');

let morgan = require('morgan');
let cookieParser = require('cookie-parser');

let config = require('./config');
let User = require('./models/user');

let apiRouter = require('./routes/api');
let authRouter = require('./routes/auth');
let usersRouter = require('./routes/users');
let protectedRouter = require('./routes/protected');

let authMiddleware = require('./middleware/auth');

let app = express();
mongoose.Promise = global.Promise;

let promise = mongoose.connect(config.database, function () {
    acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));

    let user1 = new User({username: 'admin', password: '1234'});
    let user2 = new User({username: 'ruan', password: '1234'});
    User.findOne({username: user1.username}, function (err, foundUser) {
        if (!foundUser) {
            user1.save(function (err, user) {
                if (err) return console.log(err);
                console.log(user.username + ' saved');
            });

            user2.save(function (err, user) {
                if (err) return console.log(err);
                console.log(user.username + ' saved');
            });
        }
    });

    acl.allow([
        {
            roles:['admin', 'registered'],
            allows:[
                {resources:'/api/auth', permissions: ['get', 'post']}
            ]
        },
        {
            roles:['admin'],
            allows:[
                {resources:'/api/users', permissions:['get', 'post']}
            ]
        }
    ]);

    acl.addUserRoles('admin', 'admin');
});



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

promise.then(() => {
    apiRouter.use('/users',
        // function( request, response, next ) {
        //     acl.allowedPermissions( 'admin', [ '/api/users', '/api/auth'], function( error, permissions ){
        //         response.json( permissions );
        //         next();
        //     });
        // },

        acl.middleware(2, function (req, res) {
            console.log(`username ${req.user.username}`);
            return 'admin';}
        ), usersRouter);
});

// bypass the registration routing
// apiRouter.use('/users', usersRouter);

// from here on, the routes will be protected
apiRouter.use(authMiddleware);
apiRouter.use('/protected', protectedRouter);

app.use(function (err, req, res, next) {
    console.log(err);
    res.end();
});

module.exports = app;
