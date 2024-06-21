const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  madeBy: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
