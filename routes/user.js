const express = require('express')
const router = express.Router()
const userController = require('../app/contronllers/UserController')
const {authenToken} = require('../app/middlewares/authenToken')

router.get('/get-all', authenToken, userController.getAll)

router.get('/get-by-id', userController.getById)

router.post('/create', userController.create)

router.put('/update', userController.update)

router.delete('/delete', userController.delete)

router.get('/wallet/:walletAddress', userController.getByWalletAddress)

module.exports = router