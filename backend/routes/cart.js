const router = require('express').Router()
let Cart = require('../models/cart.model')

router.route('/get').get((req, res) => {
    const userId = req.query.userId
    Cart.find({userId})
        .then(products => res.json(products[0].products))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/create').post((req, res) => {
    const userId = req.body.userId

    const newCart = new Cart({
        userId
    })

    newCart.save()
        .then(()=>res.json('Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update').post((req, res) => {
    const {userId, products} = req.body

    Cart.updateOne(
        {userId: userId},
        {
            $set: {
                products: products
            }
        }
    )
        .then(mess => res.json(mess.modifiedCount))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router