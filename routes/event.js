const express = require('express')
const router = express.Router()
const eventController = require('../app/contronllers/EventController')


router.post('/marketplace/:eventName', eventController.handleMarketplaceEvent)

router.post('/petty/:eventName', eventController.handlePettyEvent)


module.exports = router;