const marketPlaceEvent = require('../models/MarketPlaceEvent')
const pettyNftService = require('../services/PetNftService')
const OrderTransaction = require('../models/OrderTransactionModel')
const serverSocket = require('../contronllers/SocketHandler')

const ADDRESS0 = '0x0000000000000000000000000000000000000000'

class OrderService {
  PER_PAGE = 10
  PAGE = 0

  async getSellingOrders ({
    seller,
    buyer = ADDRESS0,
    perPage = this.PER_PAGE,
    page = this.PAGE,
  }) {
    const filter = {buyer, canceled: false}
    if(seller) {
      filter.seller = seller
    }
    return OrderTransaction.find(filter).limit(perPage).skip(perPage * page)
  }

  formatEvent = (event) => {
    const eventData = {
      ...event,
    }
    if (event['orderId']) {
      eventData['order_id'] = event['orderId']
      delete eventData['orderId']
    }
    if (event['seller']) {
      eventData['seller'] = event['seller'].toLowerCase()
    }
    if (event['buyer']) {
      eventData['buyer'] = event['buyer'].toLowerCase()
    }
    if (event['paymentToken']) {
      eventData['payment_token'] = event['paymentToken'].toLowerCase()
      delete eventData['paymentToken']
    }
    if (event['blockNumber']) {
      eventData['block_number'] = event['blockNumber']
      delete eventData['blockNumber']
    }
    if (event['transactionHash']) {
      eventData['transaction_hash'] = event['transactionHash']
      delete eventData['transactionHash']
    }
    return eventData
  }

  handleEventOrderAdded = async (event) => {
    const eventData = this.formatEvent(event)
    eventData.nft = await pettyNftService.getByTokenId(eventData.tokenId)
    const orderTx = new OrderTransaction(eventData)
    await orderTx.save()
    serverSocket.getSocket().emit('ORDER_ADDED', eventData)
    return orderTx
  }

  handleEventOrderMatched = async (event) => {
    const orderTx = await OrderTransaction.findOne({order_id: event.orderId})
    const id = orderTx._id
    const eventData = this.formatEvent(event)
    serverSocket.getSocket().emit('ORDER_MATCHED', eventData)
    return OrderTransaction.findByIdAndUpdate(id, eventData, {new: true})
  }

  handleEventOrderCanceled = async (orderId) => {
    const orderTx = await OrderTransaction.findOne({order_id: orderId})
    const cancelTx = OrderTransaction.findByIdAndUpdate(orderTx._id, {canceled: true},
      {new: true})
    serverSocket.getSocket().emit('ORDER_CANCELED', orderTx['_id'])
    return cancelTx
  }

  handleMarketplaceEvent = async (eventName, event) => {
    if (!eventName || !event) {
      console.log('eventName and event is required')
      throw new Error('eventName and event is required')
    }
    switch (eventName) {
      case marketPlaceEvent.ORDER_ADDED:
        await this.handleEventOrderAdded(event)
        break
      case marketPlaceEvent.ORDER_MATCHED:
        await this.handleEventOrderMatched(event)
        break
      case marketPlaceEvent.ORDER_CANCELED:
        await this.handleEventOrderCanceled(event.orderId)
        break
      default:
        break
    }
  }

}

const orderService = new OrderService()
module.exports = orderService