const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  announcementText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);