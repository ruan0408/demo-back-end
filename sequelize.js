/**
 * Created by ruan0408 on 21/02/17.
 */
let Sequelize = require('sequelize');

let sequelize = new Sequelize('registro_atendimento', 'root', 'webmaster123', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;