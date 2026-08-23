// import mongoose to speak with mongoDB easier
const mongoose = require("mongoose");

// create schema for posts
const PostSchema = new mongoose.Schema({
  // each post must have title
  title: {
    type: String,
    required: true,
  },
  // each post must have image
  image: {
    type: String,
    require: true,
  },
  // each post must have cloudinary ID (where images are stored/hosted)
  cloudinaryId: {
    type: String,
    require: true,
  },
  // each post must have a caption
  caption: {
    type: String,
    required: true,
  },
  // each post will have a count of likes
  likes: {
    type: Number,
    required: true,
  },
  // each post must have a reference to the user who created it (important when determining who can update or delete the post)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // store the date the post was created (could optionally be using timestamps, would store createdAt and updatedAt automagically)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
