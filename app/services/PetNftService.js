const logger = require('../commons/logger')
const PetNftModel = require('../models/PetNftModel')
const {PettyContract} = require('../commons/contract')
const pettyEvent = require('../models/PettyEvent')

class PetNftService {
  PER_PAGE = 10
  PAGE = 0
  
  async getAll (perPage = this.PER_PAGE,  page = this.PAGE) {
    return PetNftModel.find().limit(perPage).skip(perPage * page)
  }
  
  async getByOwner(owner) {
    return PetNftModel.find({owner_address: owner.toLowerCase()})
  }

  async getById (id) {
    return PetNftModel.findById(id)
  }

  async createToDb (pet) {
    pet['owner_address'] = pet['owner_address'].toLowerCase()
    const newPet = new PetNftModel(pet)
    await newPet.save()
    return newPet
  }

  async update (id, pet) {
    return PetNftModel.findByIdAndUpdate(id, pet, {new: true})
  }

  async delete (id) {
    return PetNftModel.findByIdAndDelete(id)
  }

  getByTokenId (tokenId) {
    return PetNftModel.findOne({nft_id: tokenId})
  }
  
  getPetElements () {
    return ['fire', 'water', 'plant']
  }

  async create (petty) {
    try {
      const adminAddress = process.env.ADMIN_PUBLIC_KEY
      await PettyContract.methods.mint(adminAddress.toLowerCase()).send({
        from: adminAddress,
      }).on('receipt', async (receipt) => {
        const {tokenId} = receipt.events.Transfer.returnValues
        logger.info(`Mint success: ${tokenId} to ${adminAddress}`)
        const newPet = {
          ...petty,
          nft_id: tokenId,
          owner_address: adminAddress,
        }
        await this.createToDb(newPet)
      }).on('error', function (error) {
        throw new Error(error)
      })
    } catch (err) {
      throw new Error(err)
    }
  }
  
  handleEventTransfer = async (eventData) => {
    const {to, tokenId} = eventData
    const pet = await this.getByTokenId(tokenId)
    return PetNftModel.findByIdAndUpdate(pet._id,
      {owner_address: to.toLowerCase()}, {new: true})
  }

  handlePettyEvent = async (eventName, event) => {
    if (!eventName || !event) {
      throw new Error('eventName and event is required')
    }
    switch (eventName) {
      case pettyEvent.TRANSFER:
        await this.handleEventTransfer(event)
        break
      default:
        break
    }
  }
}

module.exports = new PetNftService()