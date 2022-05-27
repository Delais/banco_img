'use strict'

const Model_user = require('../models/user_model')
const bcrypt = require('bcryptjs')
const {generateToken} = require('../config/token.config')


const Controller_user = {
    sign_up: async(req,res) =>{
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
    },

    sign_in: async(req, res) => {
        try {
            const {email, password} = req.body

            const Userfound = await Model_user.findOne(
                {
                    where: {
                        email
                    }
                }
            )

            if (!Userfound){
                return res.status(404).json({
                    msg: 'El Usuario o Contraseña Incorrecta',
                    status: 'Fallido'
                })
            }

            const is_password = bcrypt.compareSync(password, Userfound.password)

            if(!is_password){
                return res.status(404).json({
                    msg: 'El Usuario o Contraseña Incorrecta',
                    status: 'Fallido'
                })
            }

            const Token = generateToken({
                id: Userfound.id,
                name: Userfound.name,
                email: Userfound.email,
                user_name: Userfound.user_name
            }, '2h')

            return res.status(200).json({
                msg: 'Usuario Y Password correctos',
                status: 'Suscess',
                Token
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                msg: 'Error interno del servidor',
                status: 'Error',
                error
            })
        }
    }
}

module.exports = Controller_user