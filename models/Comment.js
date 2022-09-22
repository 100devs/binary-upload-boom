const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  Comment: {
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//model builds our blueprint and call the model then its made
module.exports = mongoose.model("Comment", CommentSchema);
