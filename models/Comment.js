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
  post: {
    //this field object id from db to link post to users
    type: mongoose.Schema.Types.ObjectId,
    //ref user model
    ref: "Post",
  },
  createdAt: {
    type: Date,
    //sets date if one isnt added
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
