//imports mongoose
const mongoose = require("mongoose");

//create new post schema
const PostSchema = new mongoose.Schema({
  //title property
  title: {
    type: String,
    required: true,
  },
  //image property, string from cloudinary
  image: {
    type: String,
    required: true,
  },
  // the cloudinary id so we can delete if needed
  cloudinaryId: {
    type: String,
    required: true,
  },
  //caption property
  caption: {
    type: String,
    required: true,
  },
  // likes property
  likes: {
    type: Number,
    required: true,
  },
  //array of user IDs that liked the post so that users cannot spam like
  likers: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  //user if of post creator
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //date created at
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//exports model and names collection posts
module.exports = mongoose.model("Post", PostSchema);
