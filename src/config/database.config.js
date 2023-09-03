const { config } = require('dotenv')
config()

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    define: {
        underscored: true, //troca letras maisuculas por minuscula e acrescenta '_' ex.: createdAt - created_at
        underscoredAll: true
    }
}