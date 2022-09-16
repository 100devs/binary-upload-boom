const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    try {
      console.log('hello', req.params.id);
      await Comment.create({
        text: req.body.text,
        likes: 0,
        user: req.user.id,
        post: req.params.postId,
      });
      console.log('Comment has been added!');
      res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log('Likes +1');
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log('Deleted Comment');
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      res.redirect('/profile');
    }
  },
};
