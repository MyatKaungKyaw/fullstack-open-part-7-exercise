const mongoose = require('mongoose')
const toJson = require('../utils/to_json_helper')

const commentSchema = new mongoose.Schema({
    comment: String,
})

commentSchema.set('toJSON', {
    transform: toJson.transformNormal
})

module.exports = mongoose.model('Comment', commentSchema)