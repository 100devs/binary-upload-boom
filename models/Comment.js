const mongoose = require("mongoose");
//comment schema 
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdBy: {
    type: String,
    ref: "User",
  },
  createdByID: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Comment", CommentSchema);
