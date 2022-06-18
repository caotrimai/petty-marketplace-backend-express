const express = require('express')
const router = express.Router()
const contractController = require('../app/contronllers/ContractController')


router.post('/buy-petty', contractController.buyPetty)


module.exports = router;