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
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "madeBy"
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
});

module.exports = mongoose.model("Comment", CommentSchema)