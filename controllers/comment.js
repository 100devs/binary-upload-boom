const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      // to get the user name
      // const commentUser = await User.findByID(req.user.id)
      // create a new post in Db using our post model
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,

        //to shoe the user name and delete our own comm
        createdByName: req.user.userName,
        createdByID: req.user.id,
      });
      console.log("Comment has been added!");
      console.log(req.body);

      // redirect to the profile route
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  // delete comments that matches with the id of logged user
  deleteComments: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentId });
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
};
