const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
 comment: {
    type: String,
    required: true
  },
  // so we can reference the User collection and get that data (user's ID)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    // so we can reference the Post collection and get that data (post's ID)
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  likes: {
    type: Number,
    required: true
  }

});

 
module.exports = mongoose.model("Comment", CommentsSchema);





