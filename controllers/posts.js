const cloudinary = require("../middleware/cloudinary");
const timestamp = require("../middleware/timestamp")
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User")

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const commentsUsers = []
      const post = await Post.findById(req.params.id);
      commentsUsers.push(post.user)  // Push the poster's ID into the array
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      const timestamps = comments.map(el => timestamp.postedTime(el.createdAt))
      for (let comment of comments) {
        commentsUsers.push(comment.user) // Iterate through comments and pushing all user IDs into the array
      }
      const users = await User.find({_id: commentsUsers}).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments, users: users, timestamps: timestamps });
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
      res.redirect(`/profile/${req.user.id}`);
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
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      res.redirect(`/profile/${req.user.id}`);
    }
  },
};