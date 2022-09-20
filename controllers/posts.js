const cloudinary = require("../middleware/cloudinary"); // Cloudinary for image storage and fetching
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  // Get profile page
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); // Get user's posts
      res.render("profile.ejs", { posts: posts, user: req.user }); // Render ejs with users posts and users info
    } catch (err) {
      console.log(err);
    }
  },
  // Get feed page
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find() // Get all posts
      .sort({ createdAt: "desc" }) // Sort posts with most recent first
      .lean(); // Get rid of extra mongoose info
      res.render("feed.ejs", { posts: posts }); // Render feed with posts
    } catch (err) {
      console.log(err);
    }
  },
  // Get individual post
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id); // Find post with uri id
      const comments = await Comment.find({post:post._id});
      res.render("post.ejs", { post: post, comments:comments, user: req.user }); // Render the post
    } catch (err) {
      console.log(err);
    }
  },
  // Create a new post
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({ // Create post in db
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
  // Add like to post
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id }, // Find post using id
        {
          $inc: { likes: 1 }, // Increment likes by 1
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`); // Redirect back to post to refresh
    } catch (err) {
      console.log(err);
    }
  },
  // Delete a post
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
