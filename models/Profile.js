const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        players: [{
            name: {
                type: String,
                required: true,
              },
            team: {
                type: String,
                required: true,
              },
              position: {
                type: String,
                required: true,
              },
              image: {
                feed: {
                  type: String,
                  required: false,
                },
                profile: {
                  type: String,
                  required: false,
                }
              },
              cloudinaryId: {
                type: String,
                require: true,
              },
              win: {
                type: Number,
                required: true,
              },
              loss: {
                type: Number,
                required: true,
              },
              notes: {
                type: String,
                required: false,
              },
        }],
        teams: [{
            name: {
                type: String,
                required: true,
              },
            sport: {
                type: String,
                required: true,
              },
        }],
        leagues: [{
            name: {
                type: String,
                required: false,
              },
            sport: {
                type: String,
                required: false,
              },
              teams: Number,
              required: false,
        }],
    }
});

module.exports = mongoose.model("Profile", ProfileSchema);