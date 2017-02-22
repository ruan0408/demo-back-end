/**
 * Created by ruan0408 on 21/02/17.
 */

function isAdmin(req, res, next) {
    if (req.user.admin) return next();

    res.status(403).send('I know who you are, but you aren\'t good enough');
}

module.exports = isAdmin;