const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },

  //ObjectId come from DB
  //coming from the routes
  //contoller pull post ID   /:id   (URL)
  postID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Post",
    required: true,
  },
})

module.exports = mongoose.model("Comment", CommentSchema);