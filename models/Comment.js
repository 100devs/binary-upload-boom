const mongoose = require("mongoose"); //use mongoose!

const CommentSchema = new mongoose.Schema({ //we got our own schema!!
  
  comment: { //the comment itself
    type: String,
    require: true,
  },

 
  likes: { //the number of likes on the comment
    type: Number,
    required: true,
  },
  post: { //the post associated with the comment
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: { //the date/time the comment was written
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema); //export ya schema
