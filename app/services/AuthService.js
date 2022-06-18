const UserModel = require('../models/UserModel')
const {uid} = require('uid')
const {web3} = require('../commons/contract')

class AuthService {

  async createUser (user) {
    user.wallet_address = user.wallet_address.toLowerCase()
    user.hash_sign_msg = uid(16)
    const newUser = new UserModel(user)
    await newUser.save()
    return newUser
  }

  async updateUser (id, user) {
    return UserModel.findByIdAndUpdate(id, user, {new: true})
  }
  
  async getByWalletAddress (walletAddress) {
    return UserModel.findOne({wallet_address: walletAddress.toLowerCase()})
  }
  
  async getSignMessage (walletAddress) {
    const isAddress = web3.utils.isAddress(walletAddress)
    if (!isAddress) {
      throw new Error('Invalid public key')
    }
    let user = await this.getByWalletAddress(walletAddress)
    if (!user) {
      user = await this.createUser({wallet_address: walletAddress})
    }
    return user['hash_sign_msg']
  }
  
  async verifySignature ({signMessage, signature, walletAddress}) {
    const isSignature = web3.utils.isHex(signature)
    if (!isSignature) {
      return false
      // throw new Error('Invalid signature')
    }
    const recoverAddress = web3.eth.accounts.recover(signMessage, signature)
    if(recoverAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return false
    }
    const user = await this.getByWalletAddress(recoverAddress)
    if (!user || user['hash_sign_msg'] !== signMessage) {
      return false
      // throw new Error('Invalid signature or sign message')
    }
    // Update user's hash_sign_msg
    user['hash_sign_msg'] = uid(16)
    await this.updateUser(user['_id'], user)
    return true
  }
}

module.exports = new AuthService()