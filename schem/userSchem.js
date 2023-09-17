const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    notif: {
        // type: mongoose.Schema.Types.ObjectId, ref: 'Friends',
        type: Array,
        required: true
    },
    assets: {
        type: Array,
        required: true
    }
    
},
{
    versionKey: false
})

module.exports = mongoose.model('User', userSchema)