const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  //profile rotue, GET request 
  getProfile: async (req, res) => {
    try {
      //find all the posts made by the logged in user
      const posts = await Post.find({ user: req.user.id });
      //render the profile view with the user and the user's post as parameters
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  //feed route, GET request
  getFeed: async (req, res) => {
    try {
      //get all the posts in the db, and sort them with the mode recent being first
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      //render the feed view with all the posts in the db
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  //posts/postID route, GET request
  getPost: async (req, res) => {
    try {
      //get the post from the database by the id passed as a parameter in the path
      const post = await Post.findById(req.params.id);
      //render the view for an induvidual post with the post information and the user's information
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  //posts/createPost route, POST request
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //make new Post instance of the model
      await Post.create({
        title: req.body.title, //post title
        image: result.secure_url, //post image url on cloudinary
        cloudinaryId: result.public_id, //cloudindary ID
        caption: req.body.caption, //post caption
        likes: 0, //post likes start at 0
        user: req.user.id, //user who posted it
      });
      console.log("Post has been added!");
      //after post was made, redirect the user to their profile
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  //posts/likePost/postID route, PUT request
  likePost: async (req, res) => {
    try {
      //find the post that is liked by the id on the url parameter
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { //increment the likes of that post by 1
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      //redirect the user to that specific post
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  //posts/delete/postID route, DELETE request
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      //redirect user to the profile page
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
