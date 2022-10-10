const Language = require("../models/Language");

module.exports = {
  getLangComp: (req, res) => {
    res.render("langChoice.ejs");
  },
  createTable: async (req, res) => {
    try {
      await Language.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("LangComp has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};