const Post = require("../models/Post");
const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params['postID'],
        user: req.user.id,
        userName: req.user.userName,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params['postID']);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params['commentID']},
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params['postID']}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.findByIdAndDelete({ _id: req.params['commentID']})

      console.log("Deleted Comment");

      res.redirect(`/post/${req.params['postID']}`);
    } catch (err) {
      res.redirect(`/post/${req.params['postID']}`);
    }
  },
};
