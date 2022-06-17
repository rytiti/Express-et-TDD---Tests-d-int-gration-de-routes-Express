// app.js
const express = require('express'),
  bodyParser = require('body-parser'),
  apiRoutes = require('./routes'),
  connection = require('./connection')
  
require('dotenv').config();
const app = express()

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(apiRoutes)

module.exports = app
