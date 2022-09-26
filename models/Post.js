const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   require: false,
  // },
  song: {
   type: String,
   require: true,
  },
  songId: {
    type: String,
    require: true,
  },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  tempo: {
    type: String,
    required: true
  },
  // caption: {
  //   type: String,
  //   required: true,
  // },
  lyrics: {
    type: String,
    required: true,
  },
  details:{
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
