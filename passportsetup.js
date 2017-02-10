/**
 * Created by ruan0408 on 10/02/17.
 */

var passport = require('passport');
var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {

    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log(username + ' ' + password);
            User.findOne({ username: username }, function (err, user) {
                console.log(user);
                console.log(err);
                if (err) {return done(err);}
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                // if (!user.validPassword(password)) {
                //     return done(null, false, { message: 'Incorrect password.' });
                // }
                return done(null, user);
            });
        }
    ));

    app.use(passport.initialize());
};
