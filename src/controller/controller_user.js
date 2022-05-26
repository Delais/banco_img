'use strict'

const Model_user = require('../models/user_model')
const bcrypt = require('bcryptjs')
const generateToken = require('../config/token.config')
2

const Controller_user = {
    new: async(req,res) =>{
        const {id, name, lastname, email,user_name ,password} = req.body

        try {
            const Userfound = await Model_user.findOne({
                where:{
                    email
                }
            })

            if (Userfound) {
                return res.status(400).json({
                    msg: 'El Usuario ya existe',
                    status: 'Fallido'
                })
            }

            let hash = bcrypt.hashSync(password, 10)

            const New_user = await Model_user.create({
                id,
                name,
                lastname,
                email,
                user_name,
                password: hash
            })

            if (!New_user) {
                return res.status(500).json(
                    {
                        msg: 'No se creo el usuario',
                        status: 'Fallido'
                    }
                )
            }

            return res.status(201).json(
                {
                    msg: 'Usuario Registrado',
                    status: 'Suscess',
                    New_user
                }
            )

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Controller_user