const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      // todo - add new props to each document
      // ? Is this needed: const commentUserName = await User.findById(req.user.id);
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id, // Unique ID, not currently in use
        createdByID: req.user.id, // Unique ID
        createdByUserName: req.user.userName, // User Name
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try{
    // let comment = await Comment.findById({ _id:})
      await Comment.deleteOne({ _id: req.params.commentId })
      res.redirect("/post/"+req.params.postId)
    } catch(err){
      console.log(err)
    }
  }
};

  //   deletePost: async (req, res) => {
  //     try {
  //       // Find post by id
  //       let post = await Post.findById({ _id: req.params.id })
  //       // Delete image from cloudinary
  //       await cloudinary.uploader.destroy(post.cloudinaryId)
  //       // Delete post from db
  //       await Post.remove({ _id: req.params.id })
  //       console.log('Deleted Post')
  //       res.redirect('/profile')
  //     } catch (err) {
  //       res.redirect('/profile')
  //     }
  //   },