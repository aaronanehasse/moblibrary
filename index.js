const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const path = require('path')
const connectDB = require('./config/db')

connectDB()
const app = express()

const port = 7000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/application/build')))
    
    app.get('*', (req, res) => {
        console.log('POTOATO: ' + path.join(__dirname + '/application/build', 'index.html'))
        res.sendFile(path.join(__dirname + '/application/build', 'index.html'))
    })
}

app.listen(port, function() {
    console.log("Server listening on port " + port)
})