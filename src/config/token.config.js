require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateToken (payload, time){
    const Token  = jwt.sign(payload,process.env.SECRET, {
        expiresIn: time
    })
    return Token
}

function decodeToken (token){
    const TokenDecode = jwt.verify(token,process.env.SECRET)
    return TokenDecode
}

module.exports = {
    generateToken,
    decodeToken
}