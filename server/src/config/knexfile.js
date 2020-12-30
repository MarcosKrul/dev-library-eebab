require('dotenv/config')

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_CREDENTIALS_HOST,
            user: process.env.DB_CREDENTIALS_USER,
            database: process.env.DB_CREDENTIALS_DATABASE,
            password: process.env.DB_CREDENTIALS_PASSWORD
        }
    }
}