const contractService = require('../services/ContractService')

class ContractController {

  // [POST] /buy-petty
  async buyPetty (req, res) {
    try {
      const {receipt} = req.body
      await contractService.mintPetty(receipt, null)
      res.status(200).json({message: 'Mint success'})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

}

module.exports = new ContractController()