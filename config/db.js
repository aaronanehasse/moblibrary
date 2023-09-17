const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://PokeMy14:633919804@cluster0.wygk1z6.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true })

        console.log(`[INF] Mongoose conected to MongoDB Database: ${connect.connection.host}`.cyan )
        
    } catch (error) {
        console.log(error.red)
        process.exit(1)
    }
}
module.exports = connectDB