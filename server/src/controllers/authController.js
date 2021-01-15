const knex = require('../database/index')
const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
require('dotenv/config')

const CLIENT_ID = process.env.GOOGLE_USER_ID
const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'

function generateToken(user) {
    const token = jwt.sign({
        id: user.id,
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
    },
    async authLoginWithGoogle(req, res) {
        const { token } = req.body

        try {
            if(!token) return res.status(400).send({
                error: 'token is null'
            })
            const client = new OAuth2Client(CLIENT_ID)
            async function verify() {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: CLIENT_ID
                })
                const payload = ticket.getPayload();
                const userid = payload['sub'];
            }
            verify(client, token).catch(() => {
                return res.status(401).send({
                    error: 'token is not valid'
                })
            })
        } catch(err) {
            return res.status(500).send({
                error: err.message
            })
        }

        axios.get(`${GOOGLE_API_URL}?id_token=${token}`).then((response) => {
            const user = response.data
            knex('users')
                .where('email', '=', user.email)
                .whereNull('password')
                .then((resp) => {
                    if(resp.length === 0) 
                        return res.status(404).send({
                            error: 'user not found'
                        })
                    return res.status(200).send({
                        user: resp[0],
                        token: generateToken(resp[0])
                    }) 
                })
        }).catch((err) => {
            return res.status(500).send({
                error: err.message
            })
        })
    }
}