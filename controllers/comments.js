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
        userName: req.user.userName,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  likeComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);

      if (comment) {
        // Check if the user has already liked the comment
        const userIndex = comment.likedBy.indexOf(req.user.id);
        
        if (userIndex > -1) {
          // User has liked the comment; remove the like
          comment.likedBy.splice(userIndex, 1);
          comment.likes -= 1;
        } else {
          // User has not liked the comment; add the like
          comment.likedBy.push(req.user.id);
          comment.likes += 1;
        }

        await comment.save();
        console.log("Like toggled");
        res.redirect(`/post/${comment.post}`);
      } else {
        console.log("Comment not found");
        res.redirect('/someErrorPage');
      }
    } catch (err) {
      console.log(err);
      res.redirect('/someErrorPage');
    }
  },

  deleteComment: async (req, res) => {
    try {
      // Find the comment by ID
      const comment = await Comment.findById(req.params.commentId);

      // Check if the user is the owner of the comment or the post
      if (comment.user.equals(req.user.id) || req.user.isAdmin) { // Add your admin check here
        // Delete the comment
        await Comment.findByIdAndRemove(req.params.commentId);
        console.log("Deleted Comment");
      } else {
        console.log("User not authorized");
        return res.redirect("/post/" + req.params.postId);
      }

      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
      res.redirect("/post/" + req.params.postId);
    }
  },
  
};
