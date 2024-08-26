const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who liked the post
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
