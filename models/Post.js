const mongoose = require("mongoose");


// Organized way of structuring data from creating posts; includes datatypes for stored titles, images etc.
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // array of comments for each post that is created
  // each comment is an object with a comment and likes property
  // an array is used because there can be multiple comments for each post
  comments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
  }]
});

// "Post" connects to the actual collection in our DB, PostScema is the name of the above schema
module.exports = mongoose.model("Post", PostSchema);
