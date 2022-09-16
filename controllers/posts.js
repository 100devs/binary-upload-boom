const cloudinary = require("../middleware/cloudinary"); //Allows cloudinary middleware
const Post = require("../models/Post"); // Variable for post model
const Comment = require('../models/Comment')

module.exports = {
  getProfile: async (req, res) => { //Get request for profile
    try {
      const posts = await Post.find({ user: req.user.id }); //Finds posts from db that has logged in user id
      res.render("profile.ejs", { posts: posts, user: req.user }); //Renders profile.ejs getting info from db of logged in user
    } catch (err) { //Errors
      console.log(err);
    }
  },
  getFeed: async (req, res) => { //Get request for feed
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); //Finds all post and puts it in descending order from created date
      res.render("feed.ejs", { posts: posts }); //Renders feed.ejs with post: posts from db
    } catch (err) { //Errors
      console.log(err);
    }
  },
  getPost: async (req, res) => { //Get request for single post
    try {
      const post = await Post.findById(req.params.id); //Finds post object in post db using _id
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean()
      res.render("post.ejs", { post: post, user: req.user, comments: comments }); //renders post.ejs with post of user
    } catch (err) { //Errors
      console.log(err);
    }
  },
  createPost: async (req, res) => { //Post request for creating a post
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); //Creates result variable declares it as cloudinary uploader

      await Post.create({ //creates post
        title: req.body.title, //Gets title from body
        image: result.secure_url, //Gets image url from cloudinary uploader
        cloudinaryId: result.public_id, //Gets cloudinaryId with cloudinary uploader
        caption: req.body.caption, //Gets caption from body
        likes: 0, // Default 0 likes
        user: req.user.id, //Gets user id from logged in user
      });
      console.log("Post has been added!"); //Console.log
      res.redirect("/profile"); //redirects to /profile
    } catch (err) { //Errors
      console.log(err);
    }
  },
  likePost: async (req, res) => { //Put request for likes
    try {
      await Post.findOneAndUpdate( //Finds post and update
        { _id: req.params.id }, //Finds by ID
        {
          $inc: { likes: 1 }, //Increases likes property by one using $inc
        }
      );
      console.log("Likes +1"); //Console.log
      res.redirect(`/post/${req.params.id}`); //Redirects to post
    } catch (err) { //Errors
      console.log(err);
    }
  },
  deletePost: async (req, res) => { //Delete request to delete one post
    try {
      let post = await Post.findById({ _id: req.params.id }); // Find post by id
      await cloudinary.uploader.destroy(post.cloudinaryId); // Delete image from cloudinary
      await Post.remove({ _id: req.params.id }); // Delete post from db
      console.log("Deleted Post");// Console.log
      res.redirect("/profile");//redirect /profile
    } catch (err) { //Errors
      res.redirect("/profile"); //redirect /profile
      console.log(err)
    }
  },
};
