'use strict'

require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAMEDB, process.env.PASSWORDDB, {
    host:process.env.HOSTDB,
    dialect:process.env.DIALECT
})

module.exports = sequelize