const Comment = require("../models/Comment");

module.exports = {
  addComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        postId: req.params.postId,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
};