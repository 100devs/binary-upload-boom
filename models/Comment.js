const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    commenter: {
        type: String,
        ref: "User",
    },
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Comment", CommentSchema);