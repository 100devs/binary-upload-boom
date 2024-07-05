const Post = require("../models/Post");
const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdAt: Date.now(),
        madeBy: req.user._id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      //create a variable for our redirect
      let comment = await Comment.findById(req.params.id)
      //find and increment comment likes proerty
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      //save post obj of comment before deleting so we can navigate user back to post page
      let postId = comment.post
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${postId}`);
    } catch (err) {
      res.redirect(`/post/${postId}`);
    }
  },
};
