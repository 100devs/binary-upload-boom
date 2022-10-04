const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
//   image: {
//     type: String,
//     require: true,
//   },
//   cloudinaryId: {
//     type: String,
//     require: true,
//   },
  location: {
    type: String,
    // required: true,
  },
//   likes: {
//     type: Number,
//     required: true,
//   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Provider", ProviderSchema);
