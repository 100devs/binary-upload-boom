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
  commentById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentBy: {
    type: String,
    ref: "User",
  },
});

module.exports = mongoose.model("Comment", CommentSchema);






// const mongoose = require("mongoose");

// const CommentSchema = new mongoose.Schema({
//   createComment: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   likes: {
//     type: Number,
//     required: true,
//   },
//   postId : {
//     type: mongoose.Types.ObjectId,
//     ref: "Post",
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// module.exports = mongoose.model("Comment", CommentSchema);
