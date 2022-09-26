const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id,
        userName: req.user.userName,

      });
      console.log("Comment has been added!");
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      
      comments.forEach(element => {
       console.log(element.user)
      });
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById(req.params.id);
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Comment.findOneAndDelete({ _id: req.params.id });
      console.log("Deleted Comment");
      console.log(req.params.id);
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      res.redirect(`/post/${comment.post}`);
    }
  },
  likeComment: async (req, res) => {
    try {
      let comment = await Comment.findById(req.params.id)
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
    }
  },
};
