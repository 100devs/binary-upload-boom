const Comment = require("../models/Comments.Model");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        onPost: req.params.id,
      });
      console.log("New comment added!");
      res.redirect(`/post/${req.params.id}`);
    }
    catch (err) {
      console.log('Comment could not be generated')
    }
  },
};
