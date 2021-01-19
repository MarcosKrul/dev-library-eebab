const knex = require('../database/index')
const crypto = require('crypto')
const transporterConfig = require('../config/transporterEmail')
require('dotenv/config')

module.exports = {
    async sendInvite(req, res) {
        const { name, email, type } = req.body

        if(!email || !type) return res.status(400).send({
            error: 'some arguments are null'
        })

        if(email.length > 45) return res.status(400).send({
            error: 'email exceed 45 char'
        })

        if(type !== 34 && type !==79 && type !== 119) 
            return res.status(400).send({
                error: 'invalid type'
            })

        const expiresIn = new Date()
        expiresIn.setHours(expiresIn.getHours() + 48)
        const token = crypto.randomBytes(20).toString('hex')

        await knex('invites').insert({
            user_type: type,
            token: token,
            email: email,
            expiresIn: expiresIn
        }).onConflict('email').merge()

        transporterConfig('invite').sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Convite para cadastro',
            template: 'index',
            context: {
                name: name? name.toUpperCase() : "CONVIDADO(a)",
                link: `http://localhost:3000/register/page/${token}`
            }
        }).then(() => {
            return res.status(200).send()
        }).catch(error => {
            return res.status(400).send({
                error: error.message
            })
        })
    }
}