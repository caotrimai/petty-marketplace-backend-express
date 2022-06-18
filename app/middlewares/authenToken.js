const jwt = require('jsonwebtoken')

function authenToken(req, res, next) {
  const authorizationHeader = req.headers['authorization']
  const token = authorizationHeader.split(' ')[1]
  if(!token) {
    res.sendStatus(401)
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    req.auth = decoded
    next()
    if(err) {
      res.sendStatus(403)
    }
  })
}

module.exports = {
  authenToken
}