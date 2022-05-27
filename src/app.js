'use strict'

const express = require('express')
const routerIndex = require('./routes/routerIndex')
const routerUser = require('./routes/routerUser')

let app = express()

//middlewares
app.use(express.urlencoded({extended:false})) // lee los datos del body
app.use(express.json())

app.use('/api',routerIndex)
app.use('/api',routerUser)

module.exports = app