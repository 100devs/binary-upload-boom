const mongoose = require("mongoose");

//Post schema for all users made
const PostSchema = new mongoose.Schema({
  //need a post title
  title: {
    type: String,
    required: true,
  },
  //need a post image url
  image: {
    type: String,
    require: true,
  },
  //need a cloudinary Id
  cloudinaryId: {
    type: String,
    require: true,
  },
  //need a post caption
  caption: {
    type: String,
    required: true,
  },
  //need a likes number
  likes: {
    type: Number,
    required: true,
  },
  //need a user who made the post
  //filled in by model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //need a created at date
  //filled in by model
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
