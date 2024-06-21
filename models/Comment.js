const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
  comment: {
    type: String,
    required: true,
  },
//   likes: {
//     type: Number,
//     required: true,
//   },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);


// Leon's

// const mongoose = require("mongoose");

// const CommentsSchema = new mongoose.Schema({
//   comment: {
//     type: String,
//     required: true,
//   },
//   likes: {
//     type: Number,
//     required: true,
//   },
//   post: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Post",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Comments", CommentsSchema);


