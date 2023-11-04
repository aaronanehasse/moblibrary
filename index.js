const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const path = require('path')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const cors = require('cors');

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '100MB', extended: true }))
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)

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

