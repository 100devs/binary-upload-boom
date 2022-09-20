const Comment = require("../models/Comment");

module.exports = {
  // getComment: async (req, res) => {
  //   try {
  //     const comments = await Comment.find().sort({ createdAt: "desc" }).lean();
  //     res.render("post.ejs", { comments: comments });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getComment: async (req, res) => {
  //   try {
  //     const comment = await Comment.findById(req.params.id);
  //     res.render("post.ejs", { comment: comment, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createComment: async (req, res) => {
    try {

      console.log('reached here safely')
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        userName: req.user.userName,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/" + req.params.id);
    } catch (err) {
      res.redirect("/" + req.params.id);
    }
  },
};
