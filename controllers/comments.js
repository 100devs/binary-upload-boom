
const Comment = require("../models/Comment");

module.exports = {

  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        userName: req.user.userName,
        post: req.params.id
        
      });
      console.log("comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Comment +1");
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let post = await Comment.findById({ _id: req.params.commentId });
      // Delete post from db
      await Comment.remove({ _id: req.params.commentId });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
