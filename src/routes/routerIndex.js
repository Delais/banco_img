'use strict'

const express = require('express')
const Router_Index = express.Router()
const controller_img = require('../controller/controller_img')

Router_Index.post('/home', controller_img.new)

module.exports = Router_Index