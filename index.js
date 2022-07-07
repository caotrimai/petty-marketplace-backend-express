require('dotenv').config()
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('./app/commons/logger')
const mongo = require('./configs/database/mongo')
const utils = require('./app/commons/utils')
const serverSocket = require('./app/contronllers/SocketHandler')
const handleRoute = require('./routes/index')

const app = express()
const server = http.createServer(app)

const port = utils.normalizePort(process.env.PORT || '8000')
app.set('port', port)

// app.use(cors({'origin': '*'}))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// init Routes
handleRoute(app)
//connect DB
mongo.connectDB()
// init Socket
serverSocket.setServer(server)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('Error: ' + err.message)
})

// log IP address
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  logger.info('IP ADDRESS: ' + add);
})
server.listen(port, () => {
  logger.info(`Server is running on port ${port}`)  
})

module.exports = server
