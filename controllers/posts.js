const cloudinary = require("../middleware/cloudinary"); // Import cloudinary
const Post = require("../models/Post"); // Import Post model

module.exports = { // Export functions
  getProfile: async (req, res) => { // Get profile page
    try {
      const posts = await Post.find({ user: req.user.id }); // Find posts by user
      res.render("profile.ejs", { posts: posts, user: req.user }); // Render profile page
    } catch (err) { // If error
      console.log(err); // Log error
    }
  },
  getFeed: async (req, res) => { // Get feed page
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); // Find posts and sort by date and strip extra mongoose data
      res.render("feed.ejs", { posts: posts }); // Render feed page
    } catch (err) {  // If error
      console.log(err); // Log error
    }
  },
  getPost: async (req, res) => { // Get post page
    try {
      const post = await Post.findById(req.params.id); // Find post by id
      res.render("post.ejs", { post: post, user: req.user }); // Render post page
    } catch (err) { // If error
      console.log(err); // Log error
    }
  },
  createPost: async (req, res) => { // Create post
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); // Upload image to cloudinary

      await Post.create({ // Create post
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!"); // Log that post has been added
      res.redirect("/profile"); // Redirect to profile page
    } catch (err) { // If error
      console.log(err); // Log error
    }
  },
  likePost: async (req, res) => { // Like post
    try {
      await Post.findOneAndUpdate( // Find post and update
        { _id: req.params.id }, // Find post by id
        {
          $inc: { likes: 1 }, // Increment likes by 1
        }
      );
      console.log("Likes +1"); // Log that likes have been incremented
      res.redirect(`/post/${req.params.id}`); // Redirect to post page
    } catch (err) { // If error
      console.log(err); // Log error
    }
  },
  deletePost: async (req, res) => { // Delete post
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id }); // Remove post by id
      console.log("Deleted Post"); // Log that post has been deleted
      res.redirect("/profile"); // Redirect to profile page
    } catch (err) { // If error
      res.redirect("/profile"); // Redirect to profile page
    }
  },
};
