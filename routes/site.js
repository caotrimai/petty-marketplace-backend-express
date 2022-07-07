const express = require('express')
const router = express.Router()
const siteController = require('../app/contronllers/SiteController')

router.get('/', siteController.index)

router.get('/connect-db', siteController.connectDb)

module.exports = router;