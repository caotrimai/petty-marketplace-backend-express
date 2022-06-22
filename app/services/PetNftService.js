const PetNftModel = require('../models/PetNftModel')
const {PettyContract} = require('../commons/contract')
const pettyEvent = require('../models/PettyEvent')

class PetNftService {
  async getAll () {
    return PetNftModel.find()
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

  getByOwner (ownerAddress) {
    return PetNftModel.find({owner_address: ownerAddress.toLowerCase()})
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
        console.log(`Mint success: ${tokenId} to ${adminAddress}`)
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
      console.log('eventName and event is required')
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