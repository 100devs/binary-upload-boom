const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true
  },
  post: {
    type: ObjectId,
    ref: "Post",
  },
  createdBy: {
    type: String,
    ref: 'User'
  },
  createdById: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
