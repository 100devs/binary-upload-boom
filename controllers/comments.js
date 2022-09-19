const Comment = require("../models/Comment");

module.exports = {
 
  createComment: async (req, res) => {
    try {
     
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      
      // Find post by id
      await Comment.deleteOne({_id: req.params.commentId})

      // Delete post from db
       
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
