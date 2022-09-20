const Comment = require("../models/Comments")


module.exports = {
  createComment: async (req, res) => {
    try {
      //const commentUser = await User.findById(req.user.id)
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdById: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id); // redirect to the post
    } catch (err) {
      console.log(err);
    }
  },
  deleteComments:  async (req, res) => {
    try{
      // deleteOne is a mongoose method. Could also do findbyID and Delete
      await Comment.deleteOne({_id: req.params.commentId})
      console.log("Comment was deleted");
      res.redirect("/post/"+req.params.postid);
    } catch (err){
      console.log(err)
    }
  }
};