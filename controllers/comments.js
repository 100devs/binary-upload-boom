const Comment = require("../models/Comment");

module.exports = {
  addComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        post: req.params.postId,
        parent: (req.body.parent || null),
        likes: 0,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${req.body.postId}`);
    } catch (err) {
      res.redirect(`/post/${req.body.postId}`);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.body.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
};