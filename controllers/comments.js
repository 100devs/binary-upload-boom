const Comment = require('../models/Comment');

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log('Comment has been added!');
      res.redirect('/post/' + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  // TODO add likes
  // addLikes
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log('Likes +1');
      res.redirect(`/post/${req.query.post}`);
    } catch (err) {
      console.log(err);
    }
  },

  // TODO add delete button
  // add route x
  // add to view x

  deleteComment: async (req, res) => {
    try {
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log('Deleted Comment');
      res.redirect(`/post/${req.query.post}`);
    } catch (err) {
      res.redirect('/profile');
    }
  },
};
