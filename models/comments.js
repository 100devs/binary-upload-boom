import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    require: true,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comments", CommentSchema);
