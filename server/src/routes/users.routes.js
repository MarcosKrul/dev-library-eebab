const routes = require('express').Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const inviteService = require('../services/invite') 
const resetPasswordService = require('../services/resetPassword')

const adminOnlyMiddleware = require('../middlewares/admOnly')
const authLoginMiddleware = require('../middlewares/authLogin')
const managerOnlyMiddleware = require('../middlewares/managerOnly')


routes.get('/users',                  authLoginMiddleware, adminOnlyMiddleware,   userController.index)
routes.post('/users/:token',                                                      userController.create)
routes.delete('/users/:id',           authLoginMiddleware, managerOnlyMiddleware, userController.delete)
routes.post('/invite',                authLoginMiddleware, managerOnlyMiddleware, inviteService.sendInvite)
routes.post('/login',                                                             authController.authLogin)
routes.patch('/users/name/update',    authLoginMiddleware,                        userController.nameUpdate)
routes.patch('/users/avatar/update',  authLoginMiddleware,                        userController.avatarUpdate)
routes.post('/login/google',                                                      authController.authLoginWithGoogle)
routes.patch('/users/reset/password',                                             resetPasswordService.resetPassword)
routes.patch('/users/forgot/password',                                            resetPasswordService.forgotPassword)


module.exports = routes