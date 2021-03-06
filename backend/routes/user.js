const router = require('express').Router()
let User = require('../models/user.model')

router.route('/add').post(async (req, res) => {
    const { mail, name, password } = req.body

    let userCheck = await User.findOne({mail})
    if(!userCheck){
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
            .then(()=>res.json({hash: hash}))
            .catch(err => res.status(400).json('Error: ' + err))
    } else {
        res.json('Used email')
    }
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

    if(user) {
        new Date() - user.hashTime>604800000 ? response = "Old hash!" : response = "Hash is on date!"
    }
    res.json([response, user])
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
                    .then(() => res.json(['logged', hash]))
                    .catch(err => res.status(400).json('Error '+ err))
            }
            else {
                res.json('Wrong data')
            }
})

module.exports = router