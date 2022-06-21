const OrderService = require('../services/OrderService')

class EventController {

  // [POST] /event/:eventName
  handleGotEvent = async (req, res) => {
    try {
      const eventName = req.params.eventName
      await OrderService.handleGotEvent(eventName, req.body)
      res.status(200).json({message: 'OK'})
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    }
  }
}

module.exports = new EventController()