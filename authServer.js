require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const PORT = 8080
const app = express();
app.set('port', PORT);

app.use(cors({'origin': '*'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// start the server in the port 3000 !
app.listen(PORT, function () {
  console.log(`Auth server started on port ${PORT}`);
});