const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/feed/`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
      try {
        await Comment.findOne(
          { _id: req.this.id });
        console.log(req.this.id)
        res.redirect(`/feed/`);
    } catch(err) {
      console.log(err);
    }
  }
}
