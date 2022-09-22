const Comment = require("../models/Comment");

module.exports = {
  
 createComment: async (req, res) => {
    try {
      //const commentUser = await User.findById(user.req.id)
       await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy:req.user.userName,
        createdById: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id );
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/comment/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      //let comment = await Comment.findById({ _id: req.params.id });
      
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.commentid });
      console.log("Deleted Comment");
      res.redirect("/post/" + req.params.postid);
    } catch (err) {
      //res.redirect("/profile");
      console.log(err)
    }
  },
};
