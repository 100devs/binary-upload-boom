const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentBody: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = new mongoose.model("Comment", commentSchema);
