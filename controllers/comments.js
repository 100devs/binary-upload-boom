const Post = require('../models/Post');
const Comment = require('../models/Comment');


module.exports = {
  createComment: async (req, res) => {
    try {
      // add new properties to each document
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id
      });
      console.log('Comment has been added!');
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  likeComment: async (req, res) => {
    try {
      let comment = await Comment.findById({ _id: req.params.id });
      await Comment.findOneAndUpdate(
        // find post to update by ID,
        { _id: req.params.id },
        {
          $inc: { likes: 1 }, // and increment by 1
        }
      );
      console.log('Likes +1');
      res.redirect(`/post/${req.query.postid}`); // Redirect back to post page
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete post from db
      await Comment.deleteOne({ _id: req.params.id });
      console.log('Deleted Comment');
      console.log(req.params.id);
      res.redirect(`/post/${req.query.postid}`);
    } catch (err) {
      res.redirect(err);
    }
  },
};