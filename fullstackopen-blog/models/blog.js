const mongoose = require('mongoose')
const toJson = require('../utils/to_json_helper')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

blogSchema.set('toJSON',{
    transform: toJson.transformNormal
})

module.exports = mongoose.model('Blog', blogSchema)