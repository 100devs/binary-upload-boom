// if the user makes a / request to the server, render back the index page
module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
};
