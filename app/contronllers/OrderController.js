const orderService = require('../services/OrderService');

class OrderController {
  //[GET] /get-all
  async getSellingOrders (req, res) {
    try {
      const orders = await orderService.getSellingOrders()
      res.status(200).json(orders)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
}

const orderController = new OrderController();
module.exports = orderController;