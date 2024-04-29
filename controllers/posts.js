const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require('../models/Comment');


module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const fetches = await Promise.all([Post.find().sort({ createdAt: "desc" }).lean(), Comment.find().lean().sort({ createdAt: "desc"})])
      console.log(fetches[0], fetches[1].filter(comment => comment.postId == '65c1304fd4dbfb37b0719954'));
      res.render("feed.ejs", { posts: fetches[0], comments: fetches[1] });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // const fetches = await Promise.all([Post.findById(req.params.id), Comment.find({postId: req.params.id}).populate('user').sort({ createdAt: "desc" }).lean()]);
      // res.render("post.ejs", { post: fetches[0], user: req.user, comments:fetches[1] });
      //Some practice destructuring! :D
      const [post, comments] = await Promise.all([Post.findById(req.params.id), Comment.find({postId: req.params.id}).populate('user').sort({ createdAt: "desc" }).lean()]);
      res.render("post.ejs", { post, user: req.user, comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      //Deletes all comments associated with that post, just tested it works :D
      await Comment.remove({ postId: req.params.id });

      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
