// require comment model
const Comments = require("../models/Comments")

module.exports = {
  createComment: async (req,res) => {
    try {
      // create comment object
      await Comments.create({
        // comment will come from input in views
        comment: req.body.comment,
        // likes always start at 0
        likes: 0,
        // sets comment to logged in user id
        madeBy: req.user.id,
        // comment belongs to the post with this id
        postId: req.params.id,
      })
      console.log("Comment added")
      // redirect back to post to update changes
      res.redirect(`/post/${req.params.id}`)
    } catch (error) {
      console.log(error)
    }
  },
  likeComment: async (req, res) => {
    try {
      let comments = await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Liked Comment");
      res.redirect(`/post/${comments.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comments.findById({ _id: req.params.id });
      // Delete post from db
      await Comments.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${comment.postId}`);
    } catch (err) {
      console.error(err);
      res.redirect('/profile')
    }
  }
}