const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
//   likes: {
//     type: Number,
//     required: true,
//   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comments", CommentsSchema);
