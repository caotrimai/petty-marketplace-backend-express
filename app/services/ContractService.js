const { PettyContract} = require('../commons/contract')

class ContractService{
  
  async mintPetty(receiptAddress, petty){
    await PettyContract.methods.mint(receiptAddress).send({
      from: process.env.ADMIN_PUBLIC_KEY,
    })
    .on('receipt', function(receipt){
      const {to, tokenId} = receipt.events.Transfer.returnValues
      console.log(`Mint success: ${to} ${tokenId}`)
    })
    .on('error', function(error){
      console.log(error);
    })
  }
  
}

module.exports = new ContractService()