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
// module.exports = mongoose.model("Post") this is where the mongoDB collection comes form
// You can add a third parameter for collection name. ("Post",PostSchema,"collection-name")
module.exports = mongoose.model("Comment", CommentSchema);
