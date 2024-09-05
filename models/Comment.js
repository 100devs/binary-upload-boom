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
    type: mongoose.Schema.Types.ObjectId, // Referencing ObjectId
    ref: "Post", // Reference to the "Post" model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
