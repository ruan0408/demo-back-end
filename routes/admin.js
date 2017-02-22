/**
 * Created by ruan0408 on 22/02/17.
 */

let express = require('express');

let adminRouter = express.Router();

adminRouter.get('/', function (req, res) {
    res.json({isAdmin: true});
});

module.exports = adminRouter;