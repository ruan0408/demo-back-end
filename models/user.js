/**
 * Created by ruan0408 on 09/02/17.
 */

let sequelize = require('../sequelize');
let Sequelize = require('sequelize');
let bcrypt = require("bcrypt-nodejs");

let User = sequelize.define('user', {
    username: {type: Sequelize.STRING, unique: true, field: 'username'},
    password: {type: Sequelize.STRING}
}, {
    freezeTableName: true // dont pluralize the table name
});


User.beforeCreate(function (user, options) {
    if (!user.changed('password')) return;

    return hashPassword(user.password)
        .then(hashedPassword => {
           user.password = hashedPassword;
        })
        .catch(err => console.log(err));
});

function hashPassword(password) {
    let salt_factor = 10;
    return new Promise((resolve, reject) => {
        let salt = bcrypt.genSaltSync(salt_factor);
        let hashedPassword = bcrypt.hashSync(password, salt);
        resolve(hashedPassword);
    });
}

User.Instance.prototype.checkPassword = function(guess) {
    return new Promise((resolve, reject) => {
        let isMatch = bcrypt.compareSync(guess, this.password);
        if(!isMatch) return reject(new Error('IncorrectPasswordError'));
        resolve(isMatch);
    });
};

User.sync();
// User.sync({force: true});
module.exports = User;
