const userService = require('../services/UserService')

class UserController {

  // [GET] /get-all 
  async getAll (req, res) {
    try {
      const users = await userService.getAll()
      res.status(200).json(users)
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    }
  }

  // [GET] /get-by-id
  async getById (req, res) {
    try {
      const user = await userService.getById(req.params.id)
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    }
  }

  // [POST] /create
  async create (req, res) {
    try {
      const user = await userService.create(req.body)
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    }
  }

  // [PUT] /update
  async update (req, res) {
    try {
      const user = await userService.update(req.params.id, req.body)
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    }
  }

  // [DELETE] /delete
  async delete (req, res) {
    try {
      const user = await userService.delete(req.params.id)
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    }
  }
  
  // [GET] /wallet/:walletAddress
  async getByWalletAddress (req, res) {
    try {
      const user = await userService.getByWalletAddress(req.params.walletAddress)
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err.message})
    }
  }
}

module.exports = new UserController()