const routes = require('express').Router()

const userRoutes = require('../routes/users.routes')

routes.use(userRoutes)

module.exports = routes