const mongoose = require("mongoose");

// change from post to comment
const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  // change to post so you can see what post is connected to comment
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// change from post to comment
module.exports = mongoose.model("Comment", CommentSchema);
