const router = require('express').Router()
let Product = require('../models/product.model')

router.route('/id:id').get((req, res) => {
    const _id = req.params.id
    Product.findOne({_id})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get').get((req, res) => {
    const {name, type, sex, collectionType} = req.query
    const filter = {}
    if(name!==''){
        filter.name = name
    }
    if(type!==''){
        filter.type = type
    }
    if(sex!==''){
        filter.sex = sex
    }
    if(collectionType!==''){
        filter.collectionType = collectionType
    }


    Product.find(filter)
        .then(products => res.json(products))
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