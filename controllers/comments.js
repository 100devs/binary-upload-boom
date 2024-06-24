const Comment = require("../models/Comment");

module.exports = {

    createComment: async (req, res) => {
    try {
      console.log(req)
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        user: req.user.id,
        likes: 0,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

};
