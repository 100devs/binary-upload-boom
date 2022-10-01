const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        commentBody: req.body.comment,
        postID: req.params.id,
        userID: req.user.id,
      });
      console.log("comment has been added");
      res.redirect(`/post/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
