const Comment = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.params.id
      });
      console.log("Post has been added!");
      res.redirect(`/post/${req.params.id}`));
    } catch (err) {
      console.log(err);
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
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      let post = await comment.findById({ _id: req.params.id });
      await comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      res.redirect(`/post/${req.params.id}`);
    }
  }
};
