const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", ContactSchema, "contact");
