module.exports = {
  getIndex: (req, res) => {
    // gets and renders the index.ejs page
    res.render("index.ejs");
  },
};
