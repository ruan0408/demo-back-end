/**
 * Created by ruan0408 on 09/02/17.
 */

let mongoose = require('mongoose');
let bcrypt = require("bcrypt-nodejs");
let SALT_FACTOR = 10;

let userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

userSchema.pre('save', function (done) {
    let user = this;
    if (!user.isModified('password')) {return done()}

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {return done(err);}
        let noop = function () {};
        bcrypt.hash(user.password, salt, noop(), function (err, hashedPassword) {
            if (err) {return done(err);}
            user.password = hashedPassword;
            console.log('password saved');
            done();
        })
    })
});

userSchema.methods.checkPassword = function(guess) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(guess, this.password, (err, isMatch) => {
            if (err) return reject(err);
            if (!isMatch) return reject(new Error('IncorrectPasswordError'));
            resolve(isMatch);
        });
    });
};

let User = mongoose.model('user', userSchema);

module.exports = User;
