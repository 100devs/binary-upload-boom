const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({
        userId: req.user.id
      });
      res.render("profile.ejs", {
        posts: posts,
        currentUser: req.user
      });
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({
        createdAt: "desc"
      }).lean()
      const users = await User.find().lean()
      res.render("feed.ejs", {
        posts: posts,
        currentUser: req.user,
        users: users
      });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId)
      const postedUser = await User.findById(post.userId)
      const users = await User.find().lean()
      const comments = await Comment.find({
        postId: req.params.postId
      }).sort({
        createdAt: "desc"
      }).lean();

      res.render("post.ejs", {
        post: post,
        currentUser: req.user,
        postedUser: postedUser,
        users: users,
        comments: comments
      });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        userId: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate({
        _id: req.params.postId
      }, {
        $inc: {
          likes: 1
        },
      });
      console.log("Likes +1");
      res.redirect(`/post/${req.params.postId}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await Post.findById({
        _id: req.params.postId
      });

      await cloudinary.uploader.destroy(post.cloudinaryId);

      await Post.remove({
        _id: req.params.postId
      });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};