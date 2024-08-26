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
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who liked the comment
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String, // Add this line to store the user's name
    required: true, // Optional: you can choose to make it required
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
