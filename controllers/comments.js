const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      console.log(req.body.comment, req.user.id, req.params.postId);
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        post: req.params.postId,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
};
