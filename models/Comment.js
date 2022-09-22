const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  postID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Post",
    required: true,
  },
})

module.exports = mongoose.model("Comment", CommentSchema);