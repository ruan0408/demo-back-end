/**
 * Created by ruan0408 on 21/02/17.
 */
let Sequelize = require('sequelize');
let DataTypes = require('sequelize/lib/data-types');
let config = require('./config');

let sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: config.db_host,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = { sequelize: sequelize, DataTypes: DataTypes};