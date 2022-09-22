const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({ // specifying each document inside our collection
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: { // could keep this to see which user made post, in our case we will be doing a post section - ie which post does this comment come from
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // referencing user schema, can make references to other mongoose schemas
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

module.exports = mongoose.model("Comment", CommentSchema); // creating model named Comment, giving it a name, and exporting it - we didn't specify collection name so it is just called Comments
