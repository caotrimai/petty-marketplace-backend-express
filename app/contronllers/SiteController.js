class SiteController {

  // [GET] /
  index(req, res) {
    res.send("Express on Vercel");
  }
}

module.exports = new SiteController()