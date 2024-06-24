const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

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
      res.render("post.ejs", { post: post, user: req.user});
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
        voteCount: 0,
        user: req.user.id,
      });
      console.log(`Comment has been added by ${req.user.userName}!`);
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  upvotePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.votes.includes(req.user.id)) {
        console.log("You already upvoted this post!");
        res.redirect("/post/" + req.params.id);
      } else {
        post.votes.push(req.user.id);
        post.voteCount++;
        await post.save();
        console.log("Upvote successful!");
        res.redirect("/post/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  downvotePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.votes.includes(req.user.id)) {
        post.votes.pull(req.user.id);
        post.voteCount--;
        await post.save();
        console.log("Downvote successful!");
        res.redirect("/post/" + req.params.id);
      } else {
        console.log("You haven't upvoted this post yet!");
        res.redirect("/post/" + req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
  editPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.user == req.user.id) {
        post.title = req.body.title;
        post.caption = req.body.caption;
        post.isEdited = true;
        await post.save();
        console.log("Post has been edited!");
        res.redirect("/profile");
      } else {
        console.log("You can't edit this post!");
        res.redirect("/profile");
      }
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
