const axios = require('axios')
require('dotenv/config')

const api = axios.create({
    baseURL: process.env.BASE_URL_API
})

module.exports = api