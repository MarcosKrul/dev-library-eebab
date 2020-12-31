const knex = require('../database/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')

function generateToken(user) {
    const token = jwt.sign({
        id:user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        type: user.user_type
        }, 
        process.env.SECRET_KEY_TOKEN, 
        {
            expiresIn: 172800
        }
    )
    return token
}

module.exports = {
    async authLogin(req, res) {
        try {
            const { emailToAuth, passToAuth } = req.body

            if(emailToAuth === '') return res.status(401).send({
                error: 'email is null'
            })

            const result = await knex('users').where('email', '=', emailToAuth)
            if(result.length === 0) return res.status(400).send({
                    error: 'user not found' 
            })
            const user = result[0]
            if(bcrypt.compareSync(passToAuth, user.password)){
                user.password = undefined
                return res.status(200).send({
                    user:  user,
                    token: generateToken(user)
                })
            } else return res.status(401).send({
                error: 'invalid password'
            })
        } catch(error) {
            return res.status(400).send({
                error: error.message
            })
        } 
    }
}