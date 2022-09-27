const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      //TODO: ADD NEW PROPERTIES TO EACH DOCUMENT / USERNAME DOESNT WORK ?
        //const commentUser = await User.findById(req.user.id);
        await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdById: req.user.id,
        createdBy: req.user.userName
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComments: async (req, res) => {
    try {
      await Comment.deleteOne({_id: req.params.commentid});
      console.log("Comment has been deleted!");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  }
};