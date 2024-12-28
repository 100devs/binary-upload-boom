const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require('../models/User');


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
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id})
      .sort({ createdAt: "desc" })
      .populate({
        path: "user", // Populate the user reference
        select: "userName _id", // Only select the username and id (you can add more fields if needed)
      })
      .lean();
      console.log(comments)
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching post and comments.");
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const user = req.user; // The logged-in user object
      const username = user.userName;  // Get the username from the logged-in user

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: [],
        user: req.user.id,
        username: username, 
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
      const post = await Post.findById(postId);
      if (!Array.isArray(post.likes)) {
        post.likes = [];
      }
      const likeIndex = post.likes.indexOf(userId);
      if (likeIndex === -1) {
        // If not, add the like (add the user's ID to the likes array)
        post.likes.push(userId);
      } else {
        // If yes, remove the like (remove the user's ID from the likes array)
        post.likes.splice(likeIndex, 1);
      }
      await post.save();
      res.redirect(`/post/${postId}`);
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
      // await Post.remove({ _id: req.params.id });
      await Post.findByIdAndDelete(req.params.id);
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      console.log("Error deleting post", err)
      res.redirect("/profile");
    }
  },
};
