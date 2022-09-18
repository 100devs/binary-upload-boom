
const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {

  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id,
      });
      console.log(`Comment has been added by ${req.user.userName}`);
      res.redirect("/post/"+ req.params.id); //redirecting to same post page
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Comment Likes +1");
      res.redirect(`/post/${req.params.postId}`); //redirect to same page 
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
     
      //Find comment by id and delete from db
      await Comment.findByIdAndDelete({_id: req.params.commentId})

      console.log("Comment Deleted");
      res.redirect(`/post/${req.params.postId}`); //redirect to same post page 

    } catch (err) {
        res.redirect(`/post/${req.params.postId}`);

    }
  },
  
};
