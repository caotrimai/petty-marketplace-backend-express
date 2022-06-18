const AIRDROP_SHOP = require('../../configs/contract/AIRDROP_SHOP')
const BIRD_TOKEN = require('../../configs/contract/BIRD_TOKEN')
const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider')
const PETTY = require('../../configs/contract/PETTY')

const provider = new Provider(
  process.env.ADMIN_PRIVATE_KEY,
  process.env.BSC_RPC_URL)

web3 = new Web3(provider)

const AirdropShopContract = new web3.eth.Contract(
  AIRDROP_SHOP.ABI,
  AIRDROP_SHOP.address)

const BirdToken = new web3.eth.Contract(
  BIRD_TOKEN.ABI,
  BIRD_TOKEN.address
)

const PettyContract = new web3.eth.Contract(
  PETTY.ABI,
  PETTY.ADDRESS
)


module.exports = {
  provider,
  web3,
  AirdropShopContract,
  BirdToken,
  PettyContract
}
