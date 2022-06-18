const express = require('express')
const authController = require('../app/contronllers/AuthController')
const router = express.Router()


router.get('/sign-message/:publicKey', authController.getSignMessage)

router.post('/verify-signature', authController.verifySignature)


module.exports = router