// Home Controller

module.exports = {
  // Renders home page.
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
