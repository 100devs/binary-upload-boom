const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Comment', CommentSchema)
