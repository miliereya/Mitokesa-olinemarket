const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    mail: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        unique: true
    },
    hashTime: {
        type: Date
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User