const Comment = require("../models/Comment");
const Post = require("../models/Post");


module.exports = {
  createComment: async (req, res) => {
    try {
      //
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
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
      console.log("Likes +1");
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById({ _id: req.params.id }); 
      await Comment.deleteOne({ _id: req.params.id }); 
      console.log("Deleted Comment");
      console.log(comment)
      res.redirect(`/post/${comment.post}`); //<---- this is the change that worked
    } catch (err) {
      // res.redirect(`/post/${req.params.id}`);
      console.log(err)
    }
  },
}; 

