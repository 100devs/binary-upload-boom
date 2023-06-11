const mongoose = require("mongoose");

const DescriptionSchema = new mongoose.Schema({
  description: {
    type: String,
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

module.exports = mongoose.model("Description", DescriptionSchema);