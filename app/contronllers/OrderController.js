const orderService = require('../services/OrderService');

class OrderController {
  //[GET] /selling
  async getSellingOrders (req, res) {
    try {
      const filter = req.query;
      const orders = await orderService.getSellingOrders(filter)
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