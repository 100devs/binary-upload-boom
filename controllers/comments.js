const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
      });
      console.log('Comment was added!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
};
