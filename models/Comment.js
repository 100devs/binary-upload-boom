const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  postId: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
