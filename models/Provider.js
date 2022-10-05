const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
//   address: {
//     type: String,
//     required: true,
//   },
  phoneNr: {
    type: Number,
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

module.exports = mongoose.model("Provider", ProviderSchema);
