'use strict'

const Model_img = require('../models/img_models')

const Controller_img = {

    new: async(req,res) =>{
        const {id} = req.body
        try {
            const new_img = await Model_img.create({
                id,
                name : req.file.filename
            })

            if(!new_img){
                return res.status(400).json(
                    {
                        msg:'No se pudo guardar la tarea',
                        status:'Fallido'
                    }
                )
            }

            res.status(201).json(
                {
                    msg:'Datos Guardados Correctamente',
                    status:'Suscess',
                    new_img
                })
        } catch (error) {
            return res.status(500).json(
                {
                    msg: 'error',
                    status: 'error',
                    error
                }
            )
        }
        console.log()
    }
}

module.exports = Controller_img