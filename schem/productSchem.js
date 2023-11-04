const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    pid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    version: {
        type: Array,
        required: true
    },
    components: {
        type: Array,
        required: true
    },
    files: {
        type: Array,
        required: true
    }
    
},
{
    versionKey: false
})

module.exports = mongoose.model('Product', productSchema)