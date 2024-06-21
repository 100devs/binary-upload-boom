const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    require: true,
  },

 
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
  ,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentsSchema);
