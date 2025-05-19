const cloudinary = require("../middleware/cloudinary"); // Cloudinary middleware for image upload & deletion
const Post = require("../models/Post"); // Post model to interact with posts collection in DB

module.exports = {
  // Get all posts created by the logged-in user and render profile page
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); // Find posts by user ID
      res.render("profile.ejs", { posts: posts, user: req.user }); // Render profile with posts and user data
    } catch (err) {
      console.log(err);
    }
  },

  // Get all posts for the global feed, sorted by newest first, and render feed page
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); // Find all posts, sorted descending
      res.render("feed.ejs", { posts: posts }); // Render feed with posts
    } catch (err) {
      console.log(err);
    }
  },

  // Get a single post by its ID and render the post details page
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id); // Find post by ID from URL param
      res.render("post.ejs", { post: post, user: req.user }); // Render post page with post and user info
    } catch (err) {
      console.log(err);
    }
  },

  // Create a new post with image upload via Cloudinary and save to database
  createPost: async (req, res) => {
    try {
      // Upload image to Cloudinary using the file path from multer
      const result = await cloudinary.uploader.upload(req.file.path);

      // Create new post document in MongoDB with Cloudinary image details
      await Post.create({
        title: req.body.title,
        image: result.secure_url, // Cloudinary URL for the uploaded image
        cloudinaryId: result.public_id, // Cloudinary's public ID (needed for deletion)
        caption: req.body.caption,
        likes: 0, // Initialize likes count to zero
        user: req.user.id, // Associate post with logged-in user
      });

      console.log("Post has been added!");
      res.redirect("/profile"); // Redirect back to profile page after post creation
    } catch (err) {
      console.log(err);
    }
  },

  // Increment the like count of a post by 1
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id }, // Find the post by ID from URL param
        {
          $inc: { likes: 1 }, // Increment likes field by 1
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`); // Redirect back to the post page
    } catch (err) {
      console.log(err);
    }
  },

  // Delete a post and its associated image from Cloudinary and database
  deletePost: async (req, res) => {
    try {
      // Find the post by ID
      let post = await Post.findById({ _id: req.params.id });

      // Delete the image from Cloudinary using its public ID
      await cloudinary.uploader.destroy(post.cloudinaryId);

      // Remove the post from MongoDB
      await Post.remove({ _id: req.params.id });

      console.log("Deleted Post");
      res.redirect("/profile"); // Redirect back to profile after deletion
    } catch (err) {
      // On error, still redirect back to profile
      res.redirect("/profile");
    }
  },
};
