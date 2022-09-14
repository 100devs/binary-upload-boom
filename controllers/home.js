module.exports = {
  //exports getIndex function
  getIndex: (req, res) => {
    // renders the index ejs file
    res.render("index.ejs");
  },
};
