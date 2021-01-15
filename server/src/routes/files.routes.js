const routes = require('express').Router()
const multer  = require('multer')
const multerConfig   = require('../config/multer')
const fileController = require('../controllers/fileController')

routes.get('/files/list', fileController.getListFiles)
routes.post(
    '/files/upload',
    multer(multerConfig).single('file'),
    fileController.uploadFile
)

module.exports = routes