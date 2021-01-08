const knex = require('../database/index')

const calc = require('../utils/calculateTicket')

module.exports = {
    async loan(req, res) {
        const { book_id, user_id } = req.body

        if(!book_id || !user_id) return res.status(401).send({
            error: 'some arguments are null'
        })

        const result = await knex('book_loan')
            .where('book_id', '=', book_id)
            .where('user_id', '=', user_id)
        if(result.length !== 0) return res.status(401).send({
            error: 'loan already exists'
        })

        const users = await knex('users').where('id', '=', user_id)
        if(users.length === 0) return res.status(404).send({
            error: 'user not found'
        })

        const books = await knex('books').where('id', '=', book_id)
        if(books.length === 0) return res.status(404).send({
            error: 'book not found'
        })

        if(books[0].amount === 0) return res.status(401).send({
            error: 'out of stock'
        })
        
        await knex('book_loan').insert({
            user_id: user_id,
            book_id: book_id,
            created_at: new Date()
        }).catch((error) => {
            return res.status(500).send({
                error: error.message
            })
        })

        await knex('books')
            .where('id', '=', books[0].id)
            .decrement({
                amount: 1
            }).then(() => {
                return res.status(200).send()
            }).catch((error) => {
                return res.status(500).send({
                    error: error.message
                })
            })
    }, 
    async devolution(req, res){
        const { user_id, book_id } = req.body

        if(!user_id || !book_id) return res.status(401).send({
            error: 'some arguments are null'
        })

        try {
            const result = await knex('book_loan')
                .where('book_id', '=', book_id)
                .where('user_id', '=', user_id)

            if(result.length === 0) return res.status(404).send({
                error: 'loan not found'
            })

            const response = await calc(result[0].id)
            console.log(response)
            if(response > 0) return res.status(400).send({
                error: 'user has pending tickets'
            })

            await knex('book_loan').where('id', '=', result[0].id).del()
                
            await knex('books').where('id', '=', book_id).increment({
                amount: 1
            })
                
            return res.status(200).send()
        } catch(err) {
            return res.status(500).send({
                error: err.message
            })
        }
    }
}