const express = require('express')
const path = require('path')
const routes = require('./routes/index')

const app = express()
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use(express.json())
app.use(routes)
app.listen(3333)