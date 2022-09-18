const Comment = require("../models/Comments");

module.exports = {
  createComment: async (req, res) => {
       await Comment.create({
        caption: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.params.id
      });
      console.log("A new comment has been added!");
      res.redirect("/post/+req.params.id");
  },
};
