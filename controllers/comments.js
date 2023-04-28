const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      
        console.log(req)
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        madeById: req.user._id,
        madeByName: req.user.userName,
        post: req.params.postId,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.postId);
    } catch (err) {
      console.log(err);
    }
  }
  
}
