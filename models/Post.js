const mongoose = require("mongoose");
//const { url } = require("../middleware/cloudinary"); prob deleted it

const PostSchema = new mongoose.Schema({
  team: {
    type: String,
    required: false,
  },
  image: {
    feed: {
      type: String,
      required: false,
    },
    profile: {
      type: String,
      required: false,
    },
    required: false
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  player: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: false,
  },
  win: {
    type: String,
    required: false,
    default: 0,
  },
  loss: {
    type: String,
    required: false,
    default: 0,
  },
  notes: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pinned: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Post", PostSchema);
