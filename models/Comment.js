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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userName: {
    type: String,
    ref: "userName",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
