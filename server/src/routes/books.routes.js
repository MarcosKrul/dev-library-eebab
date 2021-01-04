const routes = require('express').Router()
const bookController = require('../controllers/bookController')

const authLoginMiddleware = require('../middlewares/authLogin')
const managerOnlyMiddleware = require('../middlewares/managerOnly')

routes.get('/books',                      authLoginMiddleware,                        bookController.index)
routes.post('/books',                     authLoginMiddleware, managerOnlyMiddleware, bookController.create)
routes.delete('/books/:id',               authLoginMiddleware, managerOnlyMiddleware, bookController.delete)
routes.patch('/books/name/update',        authLoginMiddleware, managerOnlyMiddleware, bookController.nameUpdate)
routes.patch('/books/author/update',      authLoginMiddleware, managerOnlyMiddleware, bookController.authorUpdate)
routes.patch('/books/amount/update',      authLoginMiddleware, managerOnlyMiddleware, bookController.amountUpdate)
routes.patch('/books/book-cover/update', authLoginMiddleware, managerOnlyMiddleware, bookController.bookCoverUpdate)


module.exports = routes