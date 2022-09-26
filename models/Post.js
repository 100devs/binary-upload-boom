const mongoose = require("mongoose");

// setting up the blueprint
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

  // user associated with the particular Post from DB
  user: {
    type: mongoose.Schema.Types.ObjectId,

    // referred to User form our models
    ref: "User",
  },
  createdAt: {
    type: Date,
    // sets up a date if not is specified
    default: Date.now,
  },
  circle: {
    type: String,
    required: true,
  },
});

// implement the Schema, specify also the collection where to store (Posts)
module.exports = mongoose.model("Post", PostSchema);
