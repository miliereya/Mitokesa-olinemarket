const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: Array
    }
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart