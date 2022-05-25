'use strict'

const expres = require('express');
const app = require('./app')
const sequelize = require('./conection')

// definicion del purto en el se conesta el server
const port = (process.env.port || 4000)

app.listen(port, async()=>{
    try {
        await sequelize.sync()
        console.log('server corriendo en el puerto', port)
    } catch (error) {
        
    }
})
