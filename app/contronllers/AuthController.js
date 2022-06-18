const jwt = require('jsonwebtoken')
const authService = require('../services/AuthService')

class AuthController {
  // [GET] /sign-message
  async getSignMessage (req, res) {
    try {
      let signMessage = await authService.getSignMessage(req.params.publicKey)
      res.status(200).json(signMessage)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  // [POST] /verify-signature
  async verifySignature (req, res) {
    try {
      const {signMessage, signature, walletAddress} = req.body
      const valid = await authService.verifySignature({signMessage, signature, walletAddress})
      if(!valid) {
        res.status(401).json({error: 'Invalid signature'})
      }
      const user = await authService.getByWalletAddress(walletAddress)
      const tokenData = {
        userId: user['_id'],
        address: user['wallet_address'],
        username: user['username'],
        role: user['role']
      }
      const accessToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '7d'})
      res.status(200).json({accessToken})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}

module.exports = new AuthController()