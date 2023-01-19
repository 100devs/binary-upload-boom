const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        // grab the id from the URL, store it as "post".. current post we want the comment tied to
        post: req.params.id,
        user: req.user.id,
        userName: req.user.userName,
      });
      console.log("Comment has been added!");
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
      console.log("Likes +1");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.commentId });
      console.log("Deleted Comment");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
};
