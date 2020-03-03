const knex = require('knex');
const environment = process.env.DB_ENV;

const config = require('../knexfile');

module.exports = knex(config[environment]);