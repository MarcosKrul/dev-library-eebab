const knex = require('../database/index')

module.exports = async (id) => {

    const result = await knex('book_loan').where('id', '=', id)
    if(result.length === 0) throw new Error('loan not found')

    const now = new Date()
    const loan_date = new Date(result[0].created_at)
    loan_date.setHours(loan_date.getHours() + 336)
    
    try {
        if(now > loan_date) {
            const timeDiff = Math.abs(now.getTime() - loan_date.getTime())
            const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24))
            return (diffDays * 1.50)
        } else return 0
    } catch(error) {
        throw new Error(error.message)
    }
}