const cloudinary = require("../middleware/cloudinary");
const Player = require("../models/Player");
const Announcement = require("../models/Announcement")
const Match = require("../models/Match")

module.exports = {
  createPlayer: async (req, res) => {
    try {
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Player.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        league: req.body.league,
        email: req.body.email,
        prefCourt: req.body.prefCourt,
        prefTime: req.body.prefTime,
        user: req.user.id,
      });
      console.log("Player has been added!");
      res.redirect("/addPlayer");
    } catch (err) {
      console.log(err);
    }
  },
  createAnnouncement: async (req, res) => {
    try {
      await Announcement.create({
        announcementText: req.body.announcementText,
      });
      console.log("Announcement has been added!");
      res.redirect("/addAnnouncement");
    } catch (err) {
      console.log(err);
    }
  },
  // important function. when a match is added, check if match has occurred between player 1 and 2. If p1 has more than 2 wins against p2, add 2 points. else 10 points to p1. will have to add property to player1. 
  // I'm going to have to make year objects. 
  // findOneAndUpdate: https://www.twitch.tv/videos/1590219170?t=01h38m37s
// now make addMatch give 10 points to the winner
  addMatch: async (req, res) => {
    try {
      await Match.create({
        player1: req.body.player1,
        player2: req.body.player2,
        score: req.body.score,
        league: req.body.league,
      });
      console.log("Match has been added!");

      res.redirect("/addMatch");
    } catch (err) {
      console.log(err);
    }
  },
  // https://www.twitch.tv/videos/1590219170?t=01h20m17s
  // need it to add points to the correct league...
  // req.body.league, req.body.winner===player?
  // can a form POST and PUT at the same time?
  addPoints: async (req, res) => {
    try {
      await Player.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { points: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
