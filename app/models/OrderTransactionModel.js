const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ADDRESS0 = '0x0000000000000000000000000000000000000000'

const OrderSchema = new Schema({
  order_id: {type: String, required: true},
  seller: {type: String, required: true},
  buyer: {type: String, default: ADDRESS0},
  token_id: {type: String, required: true},
  payment_token: {type: String, required: true},
  price: {type: String, required: true},
  block_number: {type: String, required: true},
  transaction_hash: {type: String, required: true},
  canceled: {type: Boolean, default: false},
}, {timestamps: true})

const OrderTransactionModel = mongoose.model('order_transaction', OrderSchema)

module.exports = OrderTransactionModel