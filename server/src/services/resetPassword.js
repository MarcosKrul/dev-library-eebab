const knex = require('../database/index')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const transporterConfig = require('../config/transporterEmail')
require('dotenv/config')


module.exports = {
    async forgotPassword(req, res) {
        const { email } = req.body

        if(email === '') return res.status(400).send({
            error: 'email is null'
        })

        const result = await knex('users').where('email', '=', email)
        if(result.length === 0) return res.status(404).send({
            error: 'user not found'
        })

        if(result[0].password === null) return res.status(401).send({
            error: 'google user'
        })

        const expiresIn = new Date()
        expiresIn.setHours(expiresIn.getHours() + 1)
        const token = crypto.randomBytes(20).toString('hex')
        
        await knex('reset_password').insert({
            token: token,
            expiresIn: expiresIn,
            user_id: result[0].id
        }).onConflict('user_id').merge()

        transporterConfig('resetPassword').sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Redefinição',
            template: 'index',
            context: {
                name: (result[0].name).toUpperCase(),
                link: `http://localhost:3000/reset/password/page/${token}`
            }
        }).then(() => {
            return res.status(200).send()
        }).catch(error => {
            return res.status(400).send({
                error: error.message
            })
        })
    },
    async resetPassword(req, res) {
        const { token } = req.query
        const { email, newPassword } = req.body

        if(email === '') return res.status(400).send({
            error: 'email is null'
        })

        const result = await knex('users').where('email', '=', email)
        if(result.length === 0) return res.status(404).send({
            error: 'user not found'
        })

        const credentials = await knex('reset_password').where('user_id', '=', result[0].id)
        if(credentials.length === 0) return res.status(404).send({
            error: 'request to reset_password not found'
        })
        
        if(credentials[0].token !== token) return res.status(401).send({
            error: 'invalid token'
        })

        const now = new Date()
        if(now > new Date(credentials[0].expiresIn)) return res.status(401).send({
            error: 'token expired'
        })

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)
        await knex('users').update({
            password: hash,
        }).where({
            id: result[0].id,
            email: email
        })
        await knex('reset_password').where('user_id', '=', result[0].id).del()
        return res.status(200).send()
    }
}