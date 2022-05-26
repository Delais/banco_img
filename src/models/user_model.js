'use strict'

const sequelize = require('../conection')
const {DataTypes} = require('sequelize')
const Model_img = require('../models/img_models')

const user = sequelize.define('Table_user', {
    id:{
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastname:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_name:{
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false
})

user.hasMany(Model_img, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
    foreignKey: 'id_user'
})

module.exports = user