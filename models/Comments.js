const mongoose = require("mongoose")

// create comment schema
const CommentSchema = new mongoose.Schema({
  comment: {type: String, required: true},
  // post will be set to what post is commented on
  likes: {type: Number, required: true},
  postId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Post"
  },
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
  // timestamps will add a createdAt and updatedAt key value pair
}, {timestamps: true})

// export the comment model
module.exports = mongoose.model("comment", CommentSchema)
