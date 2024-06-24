const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        post: req.params.postId,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
};