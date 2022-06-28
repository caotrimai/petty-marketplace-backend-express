class SiteController {

  // [GET] /
  index(req, res) {
    return res.send("Express on Vercel");
  }
}

module.exports = new SiteController()