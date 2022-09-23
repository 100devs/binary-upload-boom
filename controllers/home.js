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
};
