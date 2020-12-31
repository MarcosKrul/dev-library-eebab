const knex = require('../database/index')

module.exports = async (req, res, next) => {
    const { id, email, type } = req

    if(type !== 145) return res.status(401).send({
        error: 'manager only'
    })

    const results = await knex('users').where({
        id: id,
        email: email
    })
    
    if(results.length === 0 || results[0].type !== 145) return res.status(401).send({
        error: 'manager only'
    }) 

    next()
}