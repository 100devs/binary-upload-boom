const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    Timestamp: true,
    get: time => time.toDateString()
  }
});

module.exports = mongoose.model("Post", PostSchema);
