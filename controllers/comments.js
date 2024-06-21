const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  addComment: async (req, res) => {
    try {
      const commentUser = await User.findById(req.user.id);
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        postId: req.params.id,
        commentAuthor: commentUser.userName,
        commentAuthorId: req.user.id
      });
      console.log("comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid });
      console.log("Deleted comment");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

