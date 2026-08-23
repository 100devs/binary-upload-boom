// import cloudinary setup with secrets from .env and import Post model
const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");


// export controller funcs to be used elsewhere in the application
module.exports = {
  getProfile: async (req, res) => {
    try {
      // search DB (posts collection) for posts from the user
      const posts = await Post.find({ user: req.user.id });
      // if found, render page with EJS, containing posts from the user
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      // if 404, or err, log the err to th econsole
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      // search DB for posts to populate feed for user
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      // if posts found, render the feed with result posts using EJS
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      // if no posts found, or any other err, log the err to the console
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // attempt to find post in DB
      const post = await Post.findById(req.params.id);
      // render the post with EJS if found
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      // if post not found, or err, log err to the console
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // talk to mongoDB, attempt to create new post
      await Post.create({
        // add post title from req.body (from user)
        title: req.body.title,
        // add img src URL
        image: result.secure_url,
        // add cloudinaryId to post
        cloudinaryId: result.public_id,
        // apply caption from req.body (from user)
        caption: req.body.caption,
        // likes default to 0
        likes: 0,
        // link post to user creating post
        user: req.user.id,
      });
      // if post creation was successful, log success to console
      console.log("Post has been added!");
      // redirect user after successful post creation
      res.redirect("/profile");
    } catch (err) {
      // if err, log the err to the console
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      // search DB for post and update its likes value
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      // log to console that the a posts likes got incremented
      console.log("Likes +1");
      // redirect user if liking post successful
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      // if err, log err to console
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
      // log to the console that post was deleted
      console.log("Deleted Post");
      // redirect user to the profile page
      res.redirect("/profile");
    } catch (err) {
      // if err, redirect user to the profile page
      res.redirect("/profile");
    }
  },
};
