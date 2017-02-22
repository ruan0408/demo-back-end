/**
 * Created by ruan0408 on 22/02/17.
 */

let express = require('express');
let apiRouter = require('./api');
let authRouter = require('./auth');
let adminRouter = require('./admin');
let usersRouter = require('./users');
let protectedRouter = require('./protected');

let router = express.Router();

router.use('/api', apiRouter);
apiRouter.use('/protected', protectedRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/admin', adminRouter);

router.use(function errorHandler(err, req, res, next) {
    console.log(err);
    res.end();
});

module.exports = router;