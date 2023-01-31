const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = require('./User')
// const Comment = require('./Comment')

const PostSchema = new mongoose.Schema({
    image: { 
        type: String,
    },
    summary: {
        type: String,
        required : true,
    }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post