const knex = require('../database/index')
const bcrypt = require('bcrypt')
const emailValidator = require('email-validator')
const transporterConfig = require('../config/transporterEmail')
require('dotenv/config')

module.exports = {
    async index(req, res)  {
        const results = await knex('users')
        results.map((user) => {
            user.password = undefined
        })
        return res.json(results)
    },
    async create(req, res) {
        
        const { 
            name, 
            email, 
            avatar, 
            password, 
        } = req.body
        
        const { token } = req.params

        const invite = await knex('invites').where('email', '=', email)
        if(invite.length === 0) return res.status(401).send({
            error: 'user has no invitation'
        })

        if(!token || invite[0].token != token) return res.status(401).send({
            error: 'invalid token'
        })

        const now = new Date()
        if(now > invite[0].expiresIn) return res.status(401).send({
            error: 'token expired'
        })

        if(!password) return res.status(400).send({
            error: 'password is null'
        })
        if(password.length > 45) return res.status(400).send({
            error: 'password exceed 45 char'
        })
        if(email.length > 45) return res.status(400).send({
            error: 'email exceed 45 char'
        })
        if(!emailValidator.validate(email)) return res.status(400).send({
            error: 'email is not valid'
        })
        if(name.length > 45) return res.status(400).send({
            error: 'name exceed 45 char'
        })

        const result = knex('users').where('email', '=', email)
        if((await result).length !== 0) return res.status(400).send({
            error: 'user already exists'
        })

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        await knex('users').insert({
            name: name,
            email: email,
            avatar: avatar,
            password: hash,
            user_type: invite[0].user_type,
            created_at: new Date(),
        }).catch((error) => {
            return res.status(400).send({
                error: error.message
            })
        })

        await knex('invites').where('email', '=', email).del()

        transporterConfig('welcome').sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Confirmação',
            template: 'index',
            context: {
                name: name.toUpperCase(),
            }
        }).then(() => {
            return res.status(200).send()
        }).catch(error => {
            return res.status(400).send({
                error: error.message
            })
        })
    },
    async delete(req, res) {
        const { id } = req.params
        await knex('users').where('id', '=', id).del().then((data) => {
            if(data === 0) return res.status(404).send({
                error: 'user not found'
            })
        }).catch((error) => {
            return res.status(400).send({
                error: error.message
            })
        })
        return res.status(200).send()
    },
    async avatarUpdate(req, res) {
        const { id, avatar } = req.body

        if(id !== req.id) return res.status(400).send({
            error: `changing another user's data`
        })

        await knex('users')
            .update( {avatar: avatar} )
            .where('id', '=', id)
            .then(() => {
                return res.status(200).send()
            }).catch((error) => {
                return res.status(400).send({
                    error: error.message
                })
            })
    },
    async nameUpdate(req, res) {
        const { id, name } = req.body

        if(id !== req.id) return res.status(400).send({
            error: `changing another user's data`
        })

        await knex('users')
            .update( {name: name} )
            .where('id', '=', id)
            .then(() => {
                return res.status(200).send()
            }).catch((error) => {
                return res.status(400).send({
                    error: error.message
                })
            })
    }
}