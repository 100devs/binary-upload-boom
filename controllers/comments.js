const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.postId,
        commenter: req.user.userName,
        commenterId: req.user.id
      });
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentId })
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      console.log(err);
    }
  }
};