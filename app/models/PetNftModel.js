const mongoose = require('mongoose')

const GENDERS = ['male', 'female']
const ELEMENTS = ['fire', 'water', 'plant']
const STATUS = ['activated', 'deleted', 'selling', 'banned', 'locked']

const petNftSchema = new mongoose.Schema({
  nft_id: {type: String},
  owner_address: {type: String, required: true},
  name: {type: String},
  gender: {type: String, enum: GENDERS, default: GENDERS[0]},
  element: {type: String, enum: ELEMENTS, default: ELEMENTS[0]},
  image: String,
  stats_hp: {type: Number, default: 0},
  stats_attack: {type: Number, default: 0},
  description: {type: String},
  status: {type: String, enum: STATUS, default: STATUS[0]},
}, {timestamps: true})

const PetNftModel = mongoose.model('pet_nft', petNftSchema)

module.exports = PetNftModel