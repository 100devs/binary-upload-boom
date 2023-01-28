// tells the view to render and spit out the index.ejs file

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
