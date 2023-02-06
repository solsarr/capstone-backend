const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const Post = require('./Post')
// const Comment = require('./Comment')

const PostSchema = new mongoose.Schema({
    image: { 
        type: String
    },
    genre: {type: String, required: true},
    title: {
       type: String, 
        required: true 
    },
    summary: {
        type: String,
        required : true,
    },
    owner: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId, ref: "User"
    }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post