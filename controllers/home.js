//get home page

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
