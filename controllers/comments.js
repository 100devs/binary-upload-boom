const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      console.log(req.body)
      await Comment.create({
        commentBody: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
};
