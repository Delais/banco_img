'use strict'

const express = require('express')
const Router_user = express.Router()
const controller_user = require('../controller/controller_user')

Router_user.post('/new_user', controller_user.new)

module.exports = Router_user