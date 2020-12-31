const routes = require('express').Router()

const userRoutes = require('../routes/users.routes')
const filesRoutes = require('../routes/files.routes')

routes.use(userRoutes)
routes.use(filesRoutes)

module.exports = routes