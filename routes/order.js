const express = require('express')
const route = express.Router()
const orderController = require('../app/contronllers/OrderController')

route.get('/selling', orderController.getSellingOrders)


module.exports = route