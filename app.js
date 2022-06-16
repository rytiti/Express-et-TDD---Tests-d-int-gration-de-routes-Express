// app.js
const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes')

const app = express()
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(apiRoutes)

module.exports = app
