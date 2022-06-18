const PetNftModel = require('../models/PetNftModel')
const {PettyContract} = require('../commons/contract')

class PetNftService {
  async getAll () {
    return PetNftModel.find()
  }

  async getById (id) {
    return PetNftModel.findById(id)
  }

  async create (pet) {
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

  async genPetNft (petty) {
    try {
      const adminAddress = process.env.ADMIN_PUBLIC_KEY
      await PettyContract.methods.mint(adminAddress).send({
        from: adminAddress,
      }).on('receipt', async (receipt) => {
        const {tokenId} = receipt.events.Transfer.returnValues
        console.log(`Mint success: ${tokenId} to ${adminAddress}`)
        const newPet = {
          ...petty,
          nft_id: tokenId,
          owner_address: adminAddress,
        }
        await this.create(newPet)
      }).on('error', function (error) {
        throw new Error(error)
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = new PetNftService()