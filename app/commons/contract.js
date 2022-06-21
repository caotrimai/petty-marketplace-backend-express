const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider')
const PETTY = require('../../configs/contract/PETTY')

const provider = new Provider(
  process.env.ADMIN_PRIVATE_KEY,
  process.env.BSC_RPC_URL)

web3 = new Web3(provider)

const PettyContract = new web3.eth.Contract(
  PETTY.ABI,
  PETTY.ADDRESS
)


module.exports = {
  provider,
  web3,
  PettyContract
}
