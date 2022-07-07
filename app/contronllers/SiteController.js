const mongo = require('../../configs/database/mongo')

class SiteController {

  // [GET] /
  index(req, res) {
    return res.send("Express on Vercel");
  }
  
  connectDb(req, res) {
    mongo.connectDB()
    return res.send("Connect DB");
  }
}

module.exports = new SiteController()