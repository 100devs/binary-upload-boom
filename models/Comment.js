const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
    commentText: { 
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  submittedBy: {
    type: String,
    required: true,
  }, //username / display name
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, //to read the user id
  createdAt: {
    type: Date,
    default: Date.now, // function
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
