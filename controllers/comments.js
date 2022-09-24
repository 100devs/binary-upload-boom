//copied from posts.js controller2
const Post = require("../models/Post");
const Comment = require('../models/Comment')

module.exports = {



  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        userId: req.user.id,
        postId: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    console.log(`reqdelete: ${req}`)
    // console.log(`reqdeleteparams: ${req.params}`)
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      let post = await Post.findById({_id: comment.postId})
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${post._id}`);
    } catch (err) {
      res.redirect(`/profile/${req.user.id}`);
    }
  },

  likeComment: async (req, res) => {

    // console.log(`reqlike: ${req}`)
    // console.log(`reqlikeparams: ${req.params}`)
    try {
      let comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${comment.postId}`);
    } catch (err) {
      console.log(err);
    }
  },

};
