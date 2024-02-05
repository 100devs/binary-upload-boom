const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.Model('Comment', CommentSchema);