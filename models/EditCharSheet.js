const mongoose = require("mongoose");

const EditCharSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdByID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdByUserName: {
    type: String,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Edit", EditCharSchema);

const mongoose = require("mongoose");