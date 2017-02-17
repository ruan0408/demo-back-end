/**
 * Created by ruan0408 on 13/02/17.
 */

let express = require('express');
let protectedRouter = express.Router();


protectedRouter.get('/', function (req, res, next) {
    res.send('you accessed a protected resource, congratulations!');
});

module.exports = protectedRouter;