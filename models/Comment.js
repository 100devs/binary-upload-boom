const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  commentLikes: {
    type: Number,
    required:true,
  }
});

module.exports = mongoose.model("Comments", CommentSchema); 