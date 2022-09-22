const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({ // specifying each document inside our collection
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
    ref: "User", // referencing user schema, can make references to other mongoose schemas
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema); // creating model named Post, giving it a name, and exporting it - we didn't specify collection name so it is just called Posts
