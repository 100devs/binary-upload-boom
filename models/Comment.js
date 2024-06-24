const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId, // connected to the User model and it's id
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // connected to the User model and it's id
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", PostSchema);
