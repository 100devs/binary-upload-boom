const mongoose = require("mongoose");

const DiscSchema = new mongoose.Schema({
  discName: {
    type: String,
    required: false,
  },
  discBrand: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    require: false,
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  discSpeed: {
    type: Number,
    required: false,
  },
  discGlide: {
    type: Number,
    required: false,
  },
  discTurn: {
    type: Number,
    required: false,
  },
  discFade: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Disc", DiscSchema);
