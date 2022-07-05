const logger = require('../commons/logger')
const { PettyContract} = require('../commons/contract')

class ContractService{
  
  async mintPetty(receiptAddress, petty){
    await PettyContract.methods.mint(receiptAddress).send({
      from: process.env.ADMIN_PUBLIC_KEY,
    })
    .on('receipt', function(receipt){
      const {to, tokenId} = receipt.events.Transfer.returnValues
      logger.info(`Mint success: ${to} ${tokenId}`)
    })
    .on('error', function(error){
      logger.error(error)
    })
  }
  
}

module.exports = new ContractService()