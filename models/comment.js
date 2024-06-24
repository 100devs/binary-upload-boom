const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
