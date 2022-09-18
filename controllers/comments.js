const Comment = require("../models/Comment");

module.exports = {
createComment: async (req, res) => {
    try {
      
      await Comment.create({
        userName: req.user.userName,
        createdById: req.user.id,
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        // requires all the properties from the schema model that specify required
      });
      console.log(req.user, req.user.id)
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      let comment = await Comment.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
      console.log("Likes +1");
      // needs to redirect using the Comment model's post id
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid });
      console.log("Deleted Comment");
      // passing two params which are found in our router
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      res.redirect("/profile");
    }
  },
}