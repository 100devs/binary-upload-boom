const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    console.log(req.user);
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        createdBy: req.user.userName,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
