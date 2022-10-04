const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        postId: req.params.id,
        author: req.user.id,
      });
      console.log("Comment added");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
