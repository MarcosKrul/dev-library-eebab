const routes = require('express').Router()

const userRoutes = require('../routes/users.routes')
const filesRoutes = require('../routes/files.routes')
const booksRoutes = require('../routes/books.routes')

routes.use(userRoutes)
routes.use(filesRoutes)
routes.use(booksRoutes)

module.exports = routes