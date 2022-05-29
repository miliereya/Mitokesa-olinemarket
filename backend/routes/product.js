const router = require('express').Router()
let Product = require('../models/product.model')

router.route('/id/:id').get((req, res) => {
    const _id = req.params.id
    Product.findOne({_id})
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get').get((req, res) => {
    const sex = req.query.sex
    Product.find({sex})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const {name, type, sex, collectionType, sale, stock} = req.body

    const newProduct = new Product({
        name,
        type,
        sex,
        collectionType,
        sale,
        stock
    })

    newProduct.save()
        .then(()=>res.json('Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router