/**
 * Created by ruan0408 on 09/02/17.
 */

let sequelize = require('../config/sequelize').sequelize;
let DataTypes = require('sequelize').DataTypes;
let bcrypt = require("bcrypt-nodejs");

let User = sequelize.define('user', {
    username: {type: DataTypes.STRING, unique: true, field: 'username'},
    password: {type: DataTypes.STRING},
    admin:    {type: DataTypes.BOOLEAN, allowNull: false}
}, {
    freezeTableName: true
});

User.beforeCreate(function (user, options) {
    if (!user.changed('password')) return;

    return hashPassword(user.password)
        .then(hashedPassword => user.password = hashedPassword)
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

User.Instance.prototype.checkPassword = function (guess) {
    return new Promise((resolve, reject) => {
        let isMatch = bcrypt.compareSync(guess, this.password);
        if(!isMatch) return reject(new Error('IncorrectPasswordError'));
        resolve(isMatch);
    });
};

sequelize.sync({force: true})
    .then(() => User.create({username: 'ariel', password: '1234', admin: false}))
    .then(() => User.create({username: 'admin', password: 'admin', admin: true}))
    .catch(err => err);

module.exports = User;
