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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("Comment", CommentSchema);
=======
module.exports = mongoose.model("Comment", CommentSchema);
>>>>>>> 4129bedfe93ac30e728fa18acb1dfb96632d4d30
