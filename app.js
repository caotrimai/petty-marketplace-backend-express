require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const handleRoute = require('./routes/index')

const app = express()

const port = process.env.PORT || '8000'
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors({  'origin': '*'}))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.log('err', err)
})

// init Routes
handleRoute(app)

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
  res.render('error')
})

app.listen(5000, () => {
  console.log("Running on port 8000.");
});

module.exports = app
