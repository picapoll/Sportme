const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

app.use(function (err, req, res, next) {
  console.error(err, err.stack)
  res.status(500).send(err)
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(process.env.PORT || 3000)
console.log(`Port ${PORT} waiting for some action!!`)
