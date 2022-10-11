const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String && Number,
    required: true
  },
  phoneNr: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model('Contact', ContactSchema)
