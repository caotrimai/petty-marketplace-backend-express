const mongoose = require('mongoose')
const logger = require('../../app/commons/logger')

class Mongo {
  connectDB () {
    mongoose.connect(
      process.env.MONGODB_URI,
      {useNewUrlParser: true, useUnifiedTopology: true},
      (err) => {
        if (err) {
          logger.error(err)
        } else {
          logger.info('MongoDB connected')
        }
      },
    )
  }
}

module.exports = new Mongo()