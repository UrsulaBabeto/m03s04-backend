const { create, findAll, findOne, findAllAdm, remove, restore} = require('../controller/product.controller')
const { Router } = require('express')
const { auth } = require('../middlewares/auth.middleware')
const productsValidation = require('../middlewares/products.middleware')


class ProductRouter{
    routesFromProduct() {
        const productRoutes = Router()
        productRoutes.post('/products',auth , productsValidation, create)
        productRoutes.get('/products',auth ,  findAll)
        productRoutes.get('/products/:productId',auth , findOne)
        productRoutes.get('/productsAdm/',auth , findAllAdm)
        productRoutes.delete('/products/:productId/remove', auth ,remove)
        productRoutes.post('/products/:productId/restore',auth , productsValidation, restore)


        return productRoutes
    }
}

module.exports = new ProductRouter()