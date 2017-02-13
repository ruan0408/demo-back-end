/**
 * Created by ruan0408 on 09/02/17.
 */

var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

userSchema.pre('save', function (done) {
    var user = this;
    if (!user.isModified('password')) {return done()}

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {return done(err);}
        var noop = function () {};
        bcrypt.hash(user.password, salt, noop(), function (err, hashedPassword) {
            if (err) {return done(err);}
            user.password = hashedPassword;
            console.log('password saved');
            done();
        })
    })
});

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

var User = mongoose.model('user', userSchema);

module.exports = User;
