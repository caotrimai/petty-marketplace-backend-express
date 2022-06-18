class SiteController {

  // [GET] /
  index(req, res) {
    return res.render('index', { title: 'Express' });
  }
}

module.exports = new SiteController()