const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const moment = require('moment');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).lean();
      const commentCounts = await Promise.all(posts.map(post => Comment.countDocuments({ post: post._id})));
      const postsWithCounts = posts.map((post, index) => ({
        ...post,
        commentCount: commentCounts[index]
      }));
      res.render("profile.ejs", { posts: postsWithCounts, user: req.user, moment:moment });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().populate('user', 'userName').sort({ createdAt: "desc" }).lean();
      const commentCounts = await Promise.all(posts.map(post => Comment.countDocuments({ post: post._id})));
      const postsWithCounts = posts.map((post, index) => ({
        ...post,
        commentCount: commentCounts[index]
      }));
      res.render("feed.ejs", { posts: postsWithCounts, user: req.user, moment: moment});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const poster = await User.findById(post.user);
      const comments = await Comment.find({post: req.params.id}).populate('user', 'userName').sort({ createdAt: "desc" }).lean();
      const postDate = moment(post.createdAt).format("lll");
      res.render("post.ejs", { post: post, user: req.user, comments: comments, poster: poster.userName, postDate: postDate, moment: moment });
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
      const post = await Post.findById(req.params.id);

      const alreadyLiked = post.likedBy.includes(req.user.id);

      if(alreadyLiked) {
        await Post.findOneAndUpdate(
          { _id: req.params.id},
          {
            $pull: { likedBy: req.user.id },
            $inc: { likes: -1 }
          }
        );
        console.log("Likes -1")
      } else {
        await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: { likedBy: req.user.id },
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      }
      
      res.redirect(req.headers.referer || `/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.redirect(req.headers.referer);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
