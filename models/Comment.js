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
    type: mongoose.Schema.Types.ObjectId, //pulls in the entire post document
    ref: "Post",
  },
  user: {
    type: Object,
    required: true,
  },
  createdAt: { //created by default, don't need to add to form on post.ejs page
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
