const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')


connectDB()
const app = express()

const port = 7000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/../app/build')))
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../app/build', 'index.html'))
    })
}

app.listen(port, function() {
    console.log("Server listening on port " + port)
})