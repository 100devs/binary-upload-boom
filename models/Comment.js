const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
  type: mongoose.Schema.Types.ObjectId,
   ref: "User",
  required: true,
  },
  username: {
    type: String,  // You can store the username here, but it's optional
    required: true,
  },
 });

module.exports = mongoose.model("Comment", CommentSchema, "comments");