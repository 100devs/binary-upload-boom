const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
