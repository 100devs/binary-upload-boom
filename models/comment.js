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
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  disc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disc'
  },
});

module.exports = mongoose.model("Comment", CommentSchema)