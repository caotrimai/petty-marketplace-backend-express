const express = require('express')
const router = express.Router()
const petNftController = require('../app/contronllers/PetNftController')
const {authenToken} = require('../app/middlewares/authenToken')


router.get('/get-all', petNftController.getAll)

router.get('/get-by-id', petNftController.getById)

router.post('/create', authenToken, petNftController.create)

router.put('/update', petNftController.update)

router.delete('/delete', petNftController.delete)


module.exports = router;