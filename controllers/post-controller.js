const express = require('express')
const authMiddleware = require('../middleware/authJwt')

const router = express.Router()

// const {User} = require('../models')
const Post = require('../models/post')
// const {Comment} = require('../models')

// Json body
router.use(express.json())

const db = require('../models/post')
console.log(Post)
// Routes
router.get('/', async (req,res)=>{
    // res.status(200).json({message: "insta index route"})
    try{
        const allPost = await Post.find({})
        res.status(200).json(allPost)
    } catch(err){
        res.status(400).json({error: err})
    } 
}) 
//populate('user').exec()
// Create route
router.post('/', async (req,res)=>{
     console.log('post route', req.body)
    try{
        const newPost =  await Post.create(req.body)
        res.status(201).json(newPost)

    } catch(err){
        res.status(400).json({error:err})
    }
    // res.status(200).json({message: "insta create/post route"})
})

// SHOW/GET route
router.get('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta show/get route"})
    try{
        const showPost= await Post.findById(req.params.id)
        res.status(201).json(showPost)
    } catch(err){
        res.status(400).json({error:err})
    }
})
// DELETE route
router.delete('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta delete/destory route"})
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        res.status(201).json(deletedPost)
    } catch(err) {
        res.status(400).json({error:err})
    }
})
// UPDATE/PUT route
router.put('/:id', async (req,res)=>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(201).json(updatedPost)
    } catch(err) {
        res.status(400).json({error:err})
    }
})

module.exports = router