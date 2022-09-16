const cloudinary = require("../middleware/cloudinary");
const User = require('../models/User');
const Post = require("../models/Post");
const Comment = require('../models/Comment');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const id = req.params.id;
      const userProfile = await User.findById(id);
      const posts = await Post.find({ user: id});
      res.render("profile.ejs", { posts: posts, user: req.user, userProfile: userProfile });
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
      const post = await Post.findById(req.params.id);
      const userPost = await User.findById(post.user);
      const comments = await Comment.find({post: req.params.id});
      const commentUsers = [];
      for(let i = 0; i < comments.length; i++) {
        commentUsers.push(await User.findById(comments[i].user));
      }
      res.render("post.ejs", { user: userPost, post: post, comments: comments, commentUsers: commentUsers});
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
};
