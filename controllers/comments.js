const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    console.log(req.params.id, req.body.comment);
    try {
      await Comment.create({
        comment: req.body.comment,
        postId: req.params.id,
      });
      console.log(`Comment has been added!`);
      res.redirect('/post/' + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};
