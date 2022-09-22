const mongoose = require("mongoose");

// const LikeSchema = new mongoose.Schema({
//   user: 
// })

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String, 
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: ()=> Date.now(),
  },
});

module.exports = mongoose.model("Post", PostSchema);
