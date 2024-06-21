
const Comment = require("../models/Comment");

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
//   getPost: async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       res.render("post.ejs", { post: post, user: req.user });
//     } catch (err) {
//       console.log(err);
//     }
//   },
createComment: async (req, res) => {
try {
  await Comment.create({
    title: req.body.title,
    //image: result.secure_url,
    //cloudinaryId: result.public_id,
    comment: req.body.comment,
    //likes: 0,
    post: req.params.id, // THIS MIGHT NOT WORK
    // user: req.user.id,
  });
  console.log("Comment has been added!");
  res.redirect("/post/"+req.params.id);
} catch (err) {
  console.log(err);
}
},
};