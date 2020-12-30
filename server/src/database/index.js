const knexfile = require('../config/knexfile')
const knex = require('knex')(knexfile.development)

module.exports = knex