const mongoose = require("mongoose");

const BioSchema = new mongoose.Schema({
  currentRead: {
    type: String,
    required: false,
  },
  currentProject: {
    type: String,
    require: false,
  },
  hobbies: {
    type: String,
    require: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bio", BioSchema);