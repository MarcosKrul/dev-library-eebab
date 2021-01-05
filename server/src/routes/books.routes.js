const routes = require('express').Router()
const bookController = require('../controllers/bookController')

const bookServices = require('../services/books')

const authLoginMiddleware = require('../middlewares/authLogin')
const adminOnlyMiddleware = require('../middlewares/admOnly')
const managerOnlyMiddleware = require('../middlewares/managerOnly')

routes.post('/books/loan',                authLoginMiddleware, adminOnlyMiddleware,   bookServices.loan)
routes.get('/books',                      authLoginMiddleware,                        bookController.index)
routes.post('/books',                     authLoginMiddleware, managerOnlyMiddleware, bookController.create)
routes.delete('/books/:id',               authLoginMiddleware, managerOnlyMiddleware, bookController.delete)
routes.post('/books/devolution',          authLoginMiddleware, adminOnlyMiddleware,   bookServices.devolution)
routes.patch('/books/name/update',        authLoginMiddleware, managerOnlyMiddleware, bookController.nameUpdate)
routes.patch('/books/author/update',      authLoginMiddleware, managerOnlyMiddleware, bookController.authorUpdate)
routes.patch('/books/amount/update',      authLoginMiddleware, managerOnlyMiddleware, bookController.amountUpdate)
routes.patch('/books/book-cover/update',  authLoginMiddleware, managerOnlyMiddleware, bookController.bookCoverUpdate)


module.exports = routes