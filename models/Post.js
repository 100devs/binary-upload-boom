//this shows everything that will show up on the "POST" when generated and we can sort or do things based on what is inside. ex -> sort by date so use createdAt object. want to return the image? use image object and it will return the string for the image.
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({  //schema is blueprint or a plan
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
