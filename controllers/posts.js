// brigngsin cloudinary and the post model / schema
const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post"); //brings in the post model / schema
const Comment = require("../models/Comment"); //brings in the comment model / schema

module.exports = {
  //getProfile is a function that takes in req and res and returns the profile page with the posts and user data from the database and renders it to the page using ejs templating engine
  getProfile: async (req, res) => { //async and await is set up to handle the promise that is returned from the database, the promise is returned from the database when the data is retrieved from the database and the promise is resolved
    try { //try block is used to handle any errors that may occur when the data is retrieved from the database
      // stores all posts made by profile user in variable posts
      const posts = await Post.find({ user: req.user.id }); //finds all posts made by the user that is logged in and stores them in the posts variable
      // renders page with posts data
      res.render("profile.ejs", { posts: posts, user: req.user }); //renders the profile page with the posts and user data from the database and renders it to the page using ejs templating engine
    } catch (err) { //catch block is used to handle any errors that may occur when the data is retrieved from the database
      console.log(err);
    }
  },
  //getFeed is a function that takes in req and res and returns the feed page with the posts data from the database and renders it to the page
  //Once again async and await are used here because we need asynchronous code to handle thr promise that is returned from the database
  //If we did not use async and await here then the code would not wait for the promise to be resolved before it continued to run and it would not have the data from the database to render to the page
  getFeed: async (req, res) => {
    try {
      // Stores all posts recently created and cuts out unecessary returned object data
      //The sort method is used to sort the posts by the date they were created in descending order
      //lean specifically tells mongoose to return the plain javascript objects instead of mongoose documents
      // const posts = await Post.find().sort({ createdAt: "desc" }).lean(); //waits for the promise to be resolved and then stores the posts in the posts variable
      // const posts = await Post.find().populate('comments').sort({createdAt:"desc"}).lean().populate('users');
      const posts = await Post.find().populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'user',
      model: 'User'
    }
  })
      console.log(posts)
      console.log(posts[0].comments[0].user.userName)
      //gets all comments from the database and stores them in the comments variables
      // const comments = await Comment.find().lean(); //waits for the promise to be resolved and then stores the comments in the comments variable
      res.render("feed.ejs", { posts: posts }); //after the promise is resolved the posts data is rendered to the feed page
    } catch (err) {
      console.log(err);
    }
  },
  //getPost is a function that takes in req and res and returns the post page with the post data from the database and renders it to the page
  getPost: async (req, res) => {
    try {
      //Just retrieving that specific post by ID
      //and storing it in a variable called post
      //and then rendering the post.ejs page
      //and passing in the post data and the user data plus the comment data for that post
      //so that we can use it in the post.ejs page
      //to display the post data and the comment data for that post
      const post = await Post.findById(req.params.id);
      //gets all comments of the post based on id then sorts it by date created in descending order
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); //uploads the image to cloudinary and stores the result in the result variable
      // Uses data from inputs to create new post
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      // redirects to profile page with new post
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      // finds the post in database by its id and increments likes by one
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
