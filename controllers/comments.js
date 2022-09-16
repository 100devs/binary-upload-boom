const Comment = require("../models/Comment");

module.exports = {
  createPost: async (req, res) => {
    try {
      await Comment.create({
        title: req.body.title,
        comment: req.body.caption,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  }
};
