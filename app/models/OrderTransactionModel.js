const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ADDRESS0 = '0x0000000000000000000000000000000000000000'

const GENDERS = ['male', 'female']
const ELEMENTS = ['fire', 'water', 'plant']

const OrderSchema = new Schema({
  order_id: {type: String, required: true},
  seller: {type: String, required: true},
  buyer: {type: String, default: ADDRESS0},
  payment_token: {type: String, required: true},
  price: {type: String, required: true},
  block_number: {type: String, required: true},
  transaction_hash: {type: String, required: true},
  canceled: {type: Boolean, default: false},
  nft: {
    nft_id: {type: String, required: true},
    owner_address: String,
    name: String,
    gender: {type: String, enum: GENDERS, default: GENDERS[0]},
    element: {type: String, enum: ELEMENTS, default: ELEMENTS[0]},
    stats_hp: {type: Number, default: 0},
    stats_attack: {type: Number, default: 0},
  }
}, {timestamps: true})

const OrderTransactionModel = mongoose.model('order_transaction', OrderSchema)

module.exports = OrderTransactionModel