const router = require('express').Router()
let Product = require('../models/product.model')

router.route('/product').get((req, res) => {
    const {name, collectionType} = req.query

    Product.findOne({name, collectionType})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get').get((req, res) => {
    const {name, type, sex, collectionType, sort} = req.query
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

    let sortObj

    if(sort==='Alphabetically, A-Z') {
        sortObj = {
            name:1
        }
    } else if(sort==='Alphabetically, Z-A'){
        sortObj = {
            name: -1
        }
    } else if(sort==='Price low to high'){
        sortObj = {
            price: 1
        }
    } else if(sort==='Price high to low'){
        sortObj = {
            price: -1
        }
    }

    Product.find(filter).sort(sortObj)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const {name, description, type, sex, collectionType, price, sale, stock} = req.body

    const newProduct = new Product({
        name,
        description,
        type,
        sex,
        collectionType,
        price,
        sale,
        stock
    })

    newProduct.save()
        .then(()=>res.json('Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router