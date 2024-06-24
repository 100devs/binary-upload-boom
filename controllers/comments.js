const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        text: req.body.text,
        postId: req.body.postId,
        author: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect(`back`);
    } catch (err) {
      console.log(err);
    }
  }
};
