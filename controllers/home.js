const Announcement = require("../models/Announcement");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getLeaderboard: (req, res) => {
    res.render("leaderboard.ejs");
  },
  getAbout: (req, res) => {
    res.render("about.ejs");
  },
  getAdmin: (req, res) => {
    res.render("admin.ejs");
  },
  getAddAnnouncement: (req, res) => {
    res.render("addAnnouncement.ejs");
  },
  getAddPlayer: (req, res) => {
    res.render("addPlayer.ejs");
  },
  getAddMatch: (req, res) => {
    res.render("addMatch.ejs");
  },
  getNewSeason: (req, res) => {
    res.render("newSeason.ejs");
  },
  // https://www.twitch.tv/videos/1585669216 1:32
  getAnnouncement: async (req, res) => {
    try {
      // go to the db, to the Announcement collection, put all that data into variable announcements. take that array and put it into index.ejs, then we're going to name our announcements announcements in our ejs
      const announcements = await Announcement.find().sort({ createdAt: "desc" }).lean();
      res.render("index.ejs", { announcements: announcements });
    } catch (err) {
      console.log(err);
    }
  },
};
