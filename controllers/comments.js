const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        createdBy: req.user.userName,
        createdById: req.user.id,
        post: req.params.id
      });
      console.log(req.user)
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  /*
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.body.id },
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
  */
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      //let post = await Post.findById({ _id: req.params.id });
      // Delete post from db
      await Comment.deleteOne({ _id: req.params.commentId });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
