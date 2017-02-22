/**
 * Created by ruan0408 on 09/02/17.
 */

let express = require('express');

let apiRouter = express.Router();
let authenticate = require('../middleware/authenticate');

apiRouter.use(authenticate);

module.exports = apiRouter;