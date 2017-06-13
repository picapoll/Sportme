const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const dbUrl = process.env.DB_URL
// // const dbUrl = 'mongodb://admin:admin100@ds151631.mlab.com:51631/test-skylab'
// const PORT = 3000

// const dbUrl = process.env.DB_URL
console.log(dbUrl)
const port = process.env.PORT

app.use(express.static(path.join(__dirname, '../public')))
// mongoose.Promise = Promise
// mongoose.connect(dbUrl)

app.listen(port)
console.log(`Listening on PORT ${port}`)
