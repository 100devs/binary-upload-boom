const Comment = require("../models/Comment");
const Post = require("../models/Post")

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        likes: 0,
        post: req.params.postid,
        userName: req.user.userName,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Delete comment from db
      let comment = await Comment.findOne({ _id: req.params.id })
      let post = await Post.findOne({ _id: comment.post })
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${post._id}`);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
