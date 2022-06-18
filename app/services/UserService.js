const UserModel = require('../models/UserModel')
const {uid} = require('uid')

class UserService {

  async getAll () {
    return UserModel.find()
  }

  async getById (id) {
    return UserModel.findById(id)
  }

  async create (user) {
    user.wallet_address = user.wallet_address.toLowerCase()
    user.hash_sign_msg = uid(16)
    const newUser = new UserModel(user)
    await newUser.save()
    return newUser
  }
  
  async update (id, user) {
    return UserModel.findByIdAndUpdate(id, user, {new: true})
  }
  
  async delete (id) {
    return UserModel.findByIdAndDelete(id)
  }
  
  async getByWalletAddress (walletAddress) {
    return UserModel.findOne({wallet_address: walletAddress.toLowerCase()})
  }
}

module.exports = new UserService()