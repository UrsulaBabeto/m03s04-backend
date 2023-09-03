const { routesFromProduct } = require('./products.routes')
const { routesFromUser } = require('./user.routes')
const { routesFromCart } = require('./cart.routes')

const { Router } = require('express')

const routes = new Router()

routes.use('/api', [
    routesFromUser(),
    routesFromProduct(),
    routesFromCart()
])

module.exports = routes