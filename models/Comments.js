const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
//   likes: {
//     type: Number,
//     required: true,
//   },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostID",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comments", CommentsSchema);
