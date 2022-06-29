const mongoose = require('mongoose')

class Mongo {
  connectDB () {
    mongoose.connect(
      process.env.MONGODB_URI,
      {useNewUrlParser: true, useUnifiedTopology: true},
      (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('MongoDB connected')
        }
      },
    )
  }
}

module.exports = new Mongo()