const petNftService = require('../services/PetNftService')
const {web3} = require('../commons/contract')

class PetNftController {

  // [GET] /get-all
  async getAll (req, res) {
    try {
      const {perPage,  page} = req.params
      const pets = await petNftService.getAll(perPage,  page)
      res.status(200).json(pets)
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err,
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
        error: err,
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
        error: err,
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
        error: err,
      })
    }
  }

  // [POST] /create
  async create (req, res) {
    if (req.auth.role !== 'admin') {
      res.status(403).json({message: 'Forbidden'})
    }
    const pet = req.body
    try {
      if (!pet) {
        res.status(400).json({error: 'Invalid request'})
      }
      await petNftService.create(pet)
      res.status(200).json({message: 'Mint nft success.'})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  // [GET] /:owner
  async getByOwner (req, res) {
    try {
      const owner = req.params.owner
      const isValid = web3.utils.isAddress(owner)
      if (!isValid) {
        return res.status(400).json({error: 'Invalid address'})
      }
      const pets = await petNftService.getByOwner(owner)
      return res.status(200).json(pets)
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err})
    }
  }

  // [GET] /image
  async getImage (req, res) {
    try {
      const id = req.query.id
      const petNft = await petNftService.getByTokenId(id)
      res.status(200).json({image: petNft.image})
    } catch (err) {
      console.log(err)
      res.status(500).json({error: err})
    }
  }

}

module.exports = new PetNftController()