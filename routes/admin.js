/**
 * Created by ruan0408 on 22/02/17.
 */

let express = require('express');

let adminRouter = express.Router();

adminRouter.get('/', function (req, res) {
    if (req.user && req.user.admin)
        res.json({isAdmin: true});
    else
        res.json({isAdmin: false});
});

module.exports = adminRouter;