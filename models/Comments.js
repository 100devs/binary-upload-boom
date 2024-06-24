const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  omment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default : 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);