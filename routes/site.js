const express = require('express')
const router = express.Router()
const siteController = require('../app/contronllers/SiteController')

router.get('/', siteController.index)

module.exports = router;