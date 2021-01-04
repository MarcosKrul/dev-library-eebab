const knex = require('../database/index')

module.exports = {
    async index(req, res) {
        const results = await knex('books')
        return res.json(results)
    }, 
    async create(req, res) {
        const {
            cdd,
            name,
            amount,
            author,
            book_cover
        } = req.body
        
        if(!name || name.length > 45) return res.status(401).send({
            error: 'name invalid'
        })

        if(!author || author.length > 45) return res.status(401).send({
            error: 'author invalid'
        })
        
        if(!book_cover || book_cover.length > 100) return res.status(401).send({
            error: 'book_cover invalid'
        })

        if(!amount || amount < 0) return res.status(401).send({
            error: 'amount invalid'
        })

        if(!cdd) return res.status(401).send({
            error: 'cdd invalid'
        })

        await knex('books').insert({
            cdd: cdd,
            name: name,
            amount: amount,
            author: author,
            book_cover: book_cover,
            created_at: new Date()
        }).then(() => {
            return res.status(200).send()
        }).catch((error) => {
            return res.status(500).send({
                error: error.message
            })
        })
    },
    async delete(req, res) {
        const { id } = req.params
        await knex('books').where('id', '=', id).del().then((data) => {
            if(data === 0) return res.status(404).send({
                error: 'book not found'
            })
        }).catch((error) => {
            return res.status(500).send({
                error: error.message
            })
        })
        return res.status(200).send()
    },
    async nameUpdate(req, res) {
        const { id, name } = req.body

        if(!name || name.length > 45) return res.status(401).send({
            error: 'name invalid'
        })

        await knex('books')
            .update({ name: name })
            .where('id', '=', id)
            .then(() => {
                return res.status(200).send()
            }).catch((error) => {
                return res.status(500).send({
                    error: error.message
                })
            })
    },
    async authorUpdate(req, res) {
        const { id, author } = req.body

        if(!author || author.length > 45) return res.status(401).send({
            error: 'author invalid'
        })

        await knex('books')
            .update({ author: author })
            .where('id', '=', id)
            .then(() => {
                return res.status(200).send()
            }).catch((error) => {
                return res.status(500).send({
                    error: error.message
                })
            })
    },
    async bookCoverUpdate(req, res) {
        const { id, book_cover } = req.body

        if(!book_cover || book_cover.length > 45) return res.status(401).send({
            error: 'book_cover invalid'
        })

        await knex('books')
            .update({ book_cover: book_cover })
            .where('id', '=', id)
            .then(() => {
                return res.status(200).send()
            }).catch((error) => {
                return res.status(500).send({
                    error: error.message
                })
            })
    },
    async amountUpdate(req, res) {
        const { id, amount } = req.body

        if(!amount || amount < 0) return res.status(401).send({
            error: 'amount invalid'
        })

        await knex('books')
            .update({ amount: amount })
            .where('id', '=', id)
            .then(() => {
                return res.status(200).send()
            }).catch((error) => {
                return res.status(500).send({
                    error: error.message
                })
            })
    }
}