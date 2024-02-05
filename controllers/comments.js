const Comment = require('../models/Comment');

module.exports = {
  postComment: async function (req, res) {
    try {
      console.log(req.params.id);
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        postId: req.params.id,
      })
      console.log('Comment has been created')
      res.redirect('back'); 
    } catch (err) {
      console.error(err);
    }
  }
}