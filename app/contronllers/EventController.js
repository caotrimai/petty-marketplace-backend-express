const logger = require('../commons/logger')
const OrderService = require('../services/OrderService')
const petNftService = require('../services/PetNftService')

class EventController {

  // [POST] /event/marketplace/:eventName
  handleMarketplaceEvent = async (req, res) => {
    try {
      const eventName = req.params.eventName
      await OrderService.handleMarketplaceEvent(eventName, req.body)
      res.status(200).json({message: 'OK'})
    } catch (err) {
      logger.error(err)
      res.status(500).json({error: err.message})
    }
  }
  
  // [POST] /event/petty/:eventName
  handlePettyEvent = async (req, res) => {
    try {
      const eventName = req.params.eventName
      await petNftService.handlePettyEvent(eventName, req.body)
      res.status(200).json({message: 'OK'})
    } catch (err) {
      logger.error(err)
      res.status(500).json({error: err.message})
    }
  }
}

module.exports = new EventController()