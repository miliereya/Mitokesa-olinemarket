const router = require('express').Router()
let Post = require('../models/post.model')

router.route('/get').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const {name, text} = req.body
    const date = new Date

    const newPost = new Post({
        name,
        date,
        text
    })

    newPost.save()
        .then(()=>res.json('Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router