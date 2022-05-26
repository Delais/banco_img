'use strict'

const express = require('express')
const routerIndex = require('./routes/routerIndex')
const routerUser = require('./routes/routerUser')
const Multer = require('multer')
const path = require('path')
const crypto = require('crypto')


let app = express()

//settings
const storage = Multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        let customFileName = crypto.randomBytes(8).toString('hex')

        let fileExtension = path.extname(file.originalname).split('.')[1];

        cb(null, customFileName + '.' + fileExtension)
    }
})

//middlewares
app.use(express.urlencoded({extended:false})) // lee los datos del body
app.use(express.json())
app.use(Multer({
    storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('file0'))

app.use('/api',routerIndex)
app.use('/api',routerUser)

module.exports = app