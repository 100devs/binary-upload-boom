const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        content: req.body.content,
        postFrom: req.params.id,
        likes: 0,
        user: req.user.id,
      });
      console.log("Comment added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
