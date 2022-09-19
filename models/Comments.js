const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    require: true,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
 createdAt: {
    type: Date,
    required: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);