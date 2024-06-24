const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },
};
