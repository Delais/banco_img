'use strict'

const express = require('express')
const Router_Index = express.Router()
const controller_img = require('../controller/controller_img')
const {is_auth} = require('../middlewares/auth')
const Multer = require('multer')
const path = require('path')
const crypto = require('crypto')

//settings
const storage = Multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        let customFileName = crypto.randomBytes(8).toString('hex')

        let fileExtension = path.extname(file.originalname).split('.')[1];

        cb(null, customFileName + '.' + fileExtension)
    }
})

const uploads = Multer({
    storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('file0')

Router_Index.post('/new-record',is_auth, uploads,controller_img.new)
Router_Index.get('/view-record',is_auth,controller_img.view)
Router_Index.put('/update-record/:id',is_auth,uploads,controller_img.update)

module.exports = Router_Index