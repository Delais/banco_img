'use strict'

const {decodeToken} = require('../config/token.config')

function is_auth(req, res, next){
    try {
        if(!req.headers.authorization){
            res.status(403).json({
                mgs: 'No autorizado',
                status: 'Fallido'
            })
        }

        const Token = req.headers.authorization.split(' ')[1]
        const TokenDecoded = decodeToken(Token)
        req.payload = TokenDecoded

        next()

    } catch (error) {
        return res.status(403).json(
            {
                mgs: 'El token ha expirado',
                status: 'Fallido'
            }
        )
    }
}

module.exports = {is_auth}