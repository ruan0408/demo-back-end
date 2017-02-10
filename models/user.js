/**
 * Created by ruan0408 on 09/02/17.
 */

var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String}
});

var User = mongoose.model('user', userSchema);

module.exports = User;
