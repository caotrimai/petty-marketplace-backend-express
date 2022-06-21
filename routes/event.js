const express = require('express')
const router = express.Router()
const eventController = require('../app/contronllers/EventController')


router.post('/:eventName', eventController.handleGotEvent)


module.exports = router;