const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toObject: { virtuals: true }
});

CommentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'comment'
})



module.exports = mongoose.model("Comment", CommentSchema);
