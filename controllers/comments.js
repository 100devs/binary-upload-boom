
const Comment = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        post: req.params.post_id
      });
      console.log("Comment has been added!");
      res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
};
