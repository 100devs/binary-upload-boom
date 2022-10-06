const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  league: {
    type: Array,
    required: true,
  },
  prefCourt: {
    type: String,
    required: true,
  },
  prefTime: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  points: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Player", PlayerSchema);