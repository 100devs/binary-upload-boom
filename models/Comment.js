const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: Object,
    required: true
  }
},{timestamps:true});

module.exports = mongoose.model("Comment", CommentSchema);