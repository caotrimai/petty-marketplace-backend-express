const PetNftModel = require('../models/PetNftModel')
const {PettyContract} = require('../commons/contract')

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
  
  getByOwner (ownerAddress) {
    return PetNftModel.find({owner_address: ownerAddress.toLowerCase()})
  }
}

module.exports = new PetNftService()