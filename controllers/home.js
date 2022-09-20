// home.js controller with getIndex method simply renders the index.ejs view

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
