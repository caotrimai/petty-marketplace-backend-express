const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const authRouter = require('./auth')
const siteRouter = require('./site')
const petNftRouter = require('./petNft')
const contractRouter = require('./contract')

function handleRoute(app){

  router.use('/pet-nft', petNftRouter);
  
  router.use('/contract', contractRouter);

  router.use('/auth', authRouter);
  
  router.use('/user', userRouter);

  router.use('/', siteRouter);
  
  app.use('/api/v1', router);
  
}

module.exports = handleRoute;
