const marketPlaceEvent = require('../models/MarketPlaceEvent')
const OrderTransaction = require('../models/OrderTransactionModel')

class OrderService {

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
    if (event['tokenId']) {
      eventData['token_id'] = event['tokenId']
      delete eventData['tokenId']
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
    const orderTx = new OrderTransaction(eventData)
    await orderTx.save()
    return orderTx
  }

  handleEventOrderMatched = async (event) => {
    const orderTx = await OrderTransaction.findOne({oder_id: event.oderId})
    const id = orderTx._id
    const eventData = this.formatEvent(event)
    return OrderTransaction.findByIdAndUpdate(id, eventData, {new: true})
  }

  handleEventOrderCanceled = async (oderId) => {
    const orderTx = await OrderTransaction.findOne({oder_id: oderId})
    return OrderTransaction.findByIdAndUpdate(orderTx._id, {canceled: true}, {new: true})
  }

  handleGotEvent = async (eventName, event) => {
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
        await this.handleEventOrderCanceled(event.oderId)
        break
      default:
        break
    }
  }

}

const marketPlaceService = new OrderService()
module.exports = marketPlaceService