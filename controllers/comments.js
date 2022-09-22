const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment, // comes from form
        likes: 0,
        post: req.params.id, // passing in ID from the URL
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
