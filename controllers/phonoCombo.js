const PhonoCombo = require("../models/PhonoCombo");

module.exports = {
  createTable: async (req, res) => {
    try {
      await PhonoCombo.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("PhonoCombo has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};