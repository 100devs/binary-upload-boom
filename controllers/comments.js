const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      //TODO - add new properties to each document
     // const commentUser = await User.findByID(req.user.id)
     
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBY: req.user.userName,
        createdByID: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
        await Comment.deleteOne({_id: req.params.commentid});
        res.redirect("/post/"+req.params.postid);
    } catch(err) {
      console.log(err)
    }
  }
};
