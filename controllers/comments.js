const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
//   getProfile: async (req, res) => {
//     try {
//       const posts = await Post.find({ user: req.user.id });
//       res.render("profile.ejs", { posts: posts, user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getFeed: async (req, res) => {
//     try {
//       const posts = await Post.find().sort({ createdAt: "desc" }).lean();
//       res.render("feed.ejs", { posts: posts });
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getComments: async (req, res) => {
//     try {
//       const comment = await Comment.findById(req.params.id);
//       res.render("post.ejs", { comments: comment });
//     } catch (err) {
//       console.log(err);
//     }
//   },
  createComment: async (req, res) => {
    try {
      const username = await User.find({ _id: req.user.id });


      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        user: req.user.id,
        username: username[0].userName
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   deletePost: async (req, res) => {
//     try {
//       // Find post by id
//       let post = await Post.findById({ _id: req.params.id });
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(post.cloudinaryId);
//       // Delete post from db
//       await Post.remove({ _id: req.params.id });
//       console.log("Deleted Post");
//       res.redirect("/profile");
//     } catch (err) {
//       res.redirect("/profile");
//     }
//   },
};
