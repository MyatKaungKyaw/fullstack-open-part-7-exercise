const mongoose = require('mongoose')
const toJson = require('../utils/to_json_helper')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
})

userSchema.set('toJSON',{
    transform: toJson.transformForUser
})

module.exports = mongoose.model('User',userSchema)