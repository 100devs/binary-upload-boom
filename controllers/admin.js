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
      res.redirect("/admin");
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
      res.redirect("/admin");
    } catch (err) {
      console.log(err);
    }
  },
  // important function. when a match is added, check if match has occurred between player 1 and 2. If p1 has more than 2 wins against p2, add 2 points. else 10 points to p1. will have to add property to player1. 
  // I'm going to have to make year objects.
  addMatch: async (req, res) => {
    try {
      await Match.create({
        player1: req.body.player1,
        player1: req.body.player2,
      });
      console.log("Match has been added!");
      res.redirect("/admin");
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
