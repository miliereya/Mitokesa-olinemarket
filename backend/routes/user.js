const router = require('express').Router()
let User = require('../models/user.model')

router.route('/add').post((req, res) => {
    const { mail, name, password } = req.body

    const date = Date.now()

    const bcrypt = require('bcrypt');
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(mail + date, salt)

    const hashTime = date
    const newUser = new User({
        mail,
        name,
        password,
        hash,
        hashTime
    })

    newUser.save()
        .then(()=>res.json(hash))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get').get((req, res) => {
    const mail = req.query.mail

    User.findOne({mail})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/hash').post(async (req, res) => {
    const hash = req.body.hash

    const user = await User.findOne({hash})
    let response = "Wrong hash!"

    if(user[0]) {
        new Date() - user[0].hashTime>604800000 ? response = "Old hash!" : response = "Hash is on date!"
    }
    res.json(response)
})

router.route('/log').post(async (req, res) => {
    const { mail, password } = req.body

    const user = await User.findOne({ mail, password })
            if(user) {
                const date = Date.now()

                const bcrypt = require('bcrypt')
                
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(mail + date, salt)

                const hashTime = date

                User.updateOne(
                    {mail: mail},
                    {
                        $set: {
                            hash: hash,
                            hashTime: hashTime
                        }
                    }
                )
                    .then(() => res.json(hash))
                    .catch(err => res.status(400).json('Error '+ err))
            }
            else {
                res.json('Wrong data')
            }
})

module.exports = router