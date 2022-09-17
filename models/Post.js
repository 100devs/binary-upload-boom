const mongoose = require("mongoose");
//const { url } = require("../middleware/cloudinary"); prob deleted it

const PostSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true,
  },
  image: {
    feed: {
      type: String,
      required: false,
    },
    profile: {
      type: String,
      required: false,
    }
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
    required: true,
  },
  win: {
    type: String,
    required: true,
  },
  loss: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Post", PostSchema);
