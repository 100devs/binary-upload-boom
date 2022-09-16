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
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id); // Grab a post with ID
      const comments = await Comment.find({postId: req.params.id}).sort({ createdAt: "asc" }).lean(); // Grab all comments with postId of req.params.id, sort in ascending order
      res.render("post.ejs", { post: post, user: req.user, comments: comments }); // Render in 'post.ejs', post(variable in ejs): post(post id), user(variable in ejs): req.user, comments(variable name in ejs): comments(comments collection)
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
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        commentBy: req.user.id,
        postId: req.params.id,
        comment: req.body.comment,
      });
      console.log('Comment has been added');
      // res.redirect(`/post/${req.params.id}`);
      res.redirect('back'); // same as above
    } catch (err) {
      console.log(err);
    }
  },
};
