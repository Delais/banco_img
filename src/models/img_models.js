'use strict'

const sequelize = require('../conection') 
const {DataTypes} = require('sequelize')

const img = sequelize.define('Table_img',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },

},{
    freezeTableName:true,
    timestamps:false
})

module.exports = img