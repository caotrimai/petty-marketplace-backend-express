const petNftService = require('../services/PetNftService')

class PetNftController {

  // [GET] /get-all
  async getAll (req, res) {
    try {
      const pets = await petNftService.getAll()
      res.status(200).json(pets)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
  
  // [GET] /get-by-id
  async getById (req, res) {
    try {
      const pet = await petNftService.getById(req.params.id)
      res.status(200).json(pet)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
  
  // [POST] /create
  async create (req, res) {
    try {
      const pet = await petNftService.create(req.body)
      res.status(200).json(pet)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
  
  // [PUT] /update
  async update (req, res) {
    try {
      const pet = await petNftService.update(req.params.id, req.body)
      res.status(200).json(pet)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
  
  // [DELETE] /delete
  async delete (req, res) {
    try {
      const pet = await petNftService.delete(req.params.id)
      res.status(200).json(pet)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  }
  
  // [POST] /generate
  async genPetNft (req, res) {
    if(req.auth.role !== 'admin') {
      res.status(403).json({message: 'Forbidden'})
    }
    try {
      const body = req.body
      // if(!pet) {
      //   res.status(400).json({error: 'Invalid request'})
      // }
      console.log(req.body)
      console.log(req.params)
      // await petNftService.genPetNft(pet)
      res.status(200).json({message: 'Mint nft success. Please wait to DB sync to blockchain'})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
  
}

module.exports = new PetNftController()