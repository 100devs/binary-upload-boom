const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        commentText: req.body.commentText,
        user: req.user.id,
        postId: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`); //Check this
    } catch (err) {
      console.log(err);
    }
  },

};
