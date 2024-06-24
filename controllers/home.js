module.exports = {
  getIndex: (req, res) => {
    // res.render("index.ejs", { user: req.user });
    res.redirect("/feed");
  },
};
