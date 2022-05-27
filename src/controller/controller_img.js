'use strict'

const Model_img = require('../models/img_models')

const Controller_img = {

    new: async (req, res) => {
        const payload = req.payload
        const { id } = payload
        try {
            const new_img = await Model_img.create({
                name: req.file.filename,
                id_user: id
            })

            if (!new_img) {
                return res.status(400).json(
                    {
                        msg: 'No se pudo guardar la tarea',
                        status: 'Fallido'
                    }
                )
            }

            res.status(201).json(
                {
                    msg: 'Datos Guardados Correctamente',
                    status: 'Suscess',
                    new_img
                })
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                {
                    msg: 'error',
                    status: 'error',
                    error
                }
            )
        }

    },

    view: async (req, res) => {

        try {
            const Payload = req.payload
            const {id} = Payload

            const read_img = await Model_img.findAll({
                where:{
                    id_user: id
                }
            })

            if(!read_img){
                res.status(404).json({
                    msg: 'No se encontraron imagenes con esta id',
                        status: 'Fallido'
                })
            }

            return res.status(200).json({
                msg: 'Imagnes Encontardas',
                status: 'Suscess',
                read_img
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

    },

    update: async(req, res) => {

        try {
        const name = req.file.filename
        const {id} = req.params
            const UpdateImg = await Model_img.update({
                name
            },{
                where:{
                    id
                }
            })

            if(UpdateImg == 0){
                return res.status(404).json({
                    msg:"No se encontro el registro a actulizar",
                    status: 'Fallido'
                })
            }

            return res.status(201).json({
                msg:"Registros Actualizados Correctamente",
                status: 'Suscess',
                UpdateImg
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

    }
}

module.exports = Controller_img