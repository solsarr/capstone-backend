const express = require('express')
const router = express.Router()

const  User  = require('../models/user')
// const { handleValidateOwnership, requireToken } = require('../middleware/auth')
// const {Post} = require('../models')

// Json body
// router.use(express.json())

const db = require('../models/user')
// console.log(User)

//INDEX ROUTE
router.get('/', async (req,res)=> {
    try {
        const allUsers = await User.find({})
        res.status(200).json(allUsers)
    } catch (err){
        res.status(400).json({error: err})
    }
})

router.post('/', async (req,res)=> {

    try {
        // 
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)

    } catch (err) {
        res.status(400).json({ error: err })
    }
})
router.get('/:id', async (req,res)=> {
    try {

        const foundUser = await User.findById(req.params.id)
        res.status(200).json(foundUser)

    }catch (err) {
        res.status(400).json({error: err})
    }
})
router.delete('/:id', async (req,res)=> {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedUser)

    }catch (err) {
        // console.log(err)
        res.status(400).json({error: err})
    }
})

router.put('/:id', async (req,res)=> {

    try {

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatedUser)

    }catch (err) {
        res.status(400).json({error: err})
    }
})

module.exports = router