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
  },
  likeComment: async function(req, res) {
    try {
      const comment = await Comment.findOneAndUpdate({_id: req.params.id}, {
        $inc: { likes: 1},
      }).populate('postId').lean();
      
      console.log(`Liked post ` + comment.postId.title)
      res.redirect('back');
    } catch (err) {
      console.error(err);
    }
  }
}