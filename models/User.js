const mongoose = require('mongoose')

// schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: true
    }
}, {timespan: true})

const User = mongoose.model("User", UserSchema)

module.exports = User