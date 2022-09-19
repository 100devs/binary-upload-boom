const Comment = require("../models/Comments")


module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id); // redirect to the post
    } catch (err) {
      console.log(err);
    }
  },
};