/**
 * Created by ruan0408 on 22/02/17.
 */

module.exports = function (req, res, next) {
    if (req.user.admin) return next();

    res.status(403).send();
};
