const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  /*
  likes: {
    type: Number,
    required: true,
  },*/
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
