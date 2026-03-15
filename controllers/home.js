//export to render index.ejs for the home page
module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
