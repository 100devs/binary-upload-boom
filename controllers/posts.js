const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
/*
In the code you've provided, you are importing two modules: cloudinary and Post. These modules appear to be related to handling image uploads and managing posts within your Express.js application. Let's break down what each of these imports likely does:

    const cloudinary = require("../middleware/cloudinary");:
        This line imports the cloudinary module from a file located in the "../middleware/cloudinary" directory.
        cloudinary here likely refers to a middleware or utility function related to image uploads and cloud-based image storage. Cloudinary is a popular cloud service for managing and delivering images and other media assets.

    const Post = require("../models/Post");:
        This line imports the Post model from a file located in the "../models/Post" directory.
        The Post model likely represents posts or content within your application. It's common for web applications to have models that define the structure and behavior of data objects stored in a database. In this case, Post may represent individual posts or articles with attributes such as title, content, author, and possibly an image associated with each post.

These imports suggest that your Express.js application is likely handling image uploads using Cloudinary and managing posts using a Post model. The specific implementations of these modules would depend on your application's requirements and use cases. You may have routes and controllers that use the cloudinary middleware to handle image uploads and the Post model to create, read, update, and delete posts in your application.

*/




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
      res.render("post.ejs", { post: post, user: req.user });
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

/*
The code you've provided defines a set of route handler functions that are likely used in an Express.js application to manage user profiles, posts, and interactions with posts. Let's break down each of these functions:

    getProfile:
        This route handler is an async function that handles GET requests to view a user's profile.
        It attempts to find posts associated with the currently authenticated user (req.user.id) using the Post model.
        If the posts are found, it renders the "profile.ejs" view, passing the posts and user information to the view for rendering.
        If an error occurs during this process, it logs the error.

    getFeed:
        This route handler is an async function that handles GET requests to view a feed of posts.
        It attempts to find all posts and sort them by createdAt in descending order.
        It renders the "feed.ejs" view, passing the posts to the view for rendering.
        If an error occurs during this process, it logs the error.

    getPost:
        This route handler is an async function that handles GET requests to view a single post.
        It attempts to find a post by its ID (req.params.id) using the Post model.
        If the post is found, it renders the "post.ejs" view, passing the post and user information to the view for rendering.
        If an error occurs during this process, it logs the error.

    createPost:
        This route handler is an async function that handles POST requests to create a new post.
        It first uploads an image to Cloudinary using the cloudinary middleware (assuming you have the appropriate middleware and setup).
        Then, it creates a new post in the database using the Post model, including the image URL from Cloudinary and other post-related information.
        After successfully creating the post, it logs a message and redirects the user to their profile.

    likePost:
        This route handler is an async function that handles GET requests to like a post.
        It updates the likes count of a post by incrementing it using $inc in a MongoDB update operation.
        After updating the likes count, it logs a message and redirects the user to the post's page.

    deletePost:
        This route handler is an async function that handles POST requests to delete a post.
        It first finds the post by its ID using the Post model.
        It then deletes the image associated with the post from Cloudinary using the cloudinary middleware.
        Finally, it removes the post from the database and logs a message.

These route handlers seem to be part of a social media or content sharing application where users can view profiles, create and interact with posts, and manage their own posts. The implementation relies on the Post model for interacting with post data and Cloudinary for image management.


*/