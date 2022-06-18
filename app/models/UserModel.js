const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  wallet_address: {type: String, required: true},
  display_name: {type: String},
  hash_sign_msg: {type: String, required: true},
  username: {type: String},
  password: {type: String},
  role: {type: String, enum: ['admin', 'user'], default: 'user'},
}, {timestamps: true})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
