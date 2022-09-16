const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    console.log(req);
    try {
      await Comment.create({
        comment: req.body.comment,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
    }
  },
};
