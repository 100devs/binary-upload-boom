const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.postId,
        user: req.params.userName
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { post: req.params.postId, _id: req.params.commentId },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  }
};
