const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentBody: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  postID: mongoose.Schema.Types.ObjectId,
  userID: mongoose.Schema.Types.ObjectId,
});

module.exports = new mongoose.model("Comment", commentSchema);
