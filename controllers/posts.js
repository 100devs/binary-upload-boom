const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      // Go to post collection and find documents that have a userID property that matches the user ID. This profile only works for the logged in user. 
      res.render("profile.ejs", { posts: posts, user: req.user });
     // Tells the view to render the posts that match the userID in the view - profile EJS.
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
       // Tells the model to grab all posts from the database. An array of objects is created and they are sorted in descendings order based on date/time.
       //Lean is mongoose and states give me the object and take the extra document stuff away. This improves speed.
      res.render("feed.ejs", { posts: posts });
      // Tells the feed.ejs to render the posts.
    } catch (err) {
      console.log(err);
    }
  },
 
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      // Finding the post by the post ID which comes from the get request route.
      res.render("post.ejs", { post: post, user: req.user, comment: comment, });
      // Sends the information to the post.ejs view which will render it. Req.user is the current session and relates to cookies stored in the database.
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      // We need cloudinary to respond with the URL

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        // We may need the ID to delete it. 
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      // Passes the request through to the post model, following the schema and console logs that post has been added. Refreshes
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
      // Speaks to the model and finds document where the ID matches the one in the request and increases likes by 1. Console logs this and redirects to the specific post using the ID.
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id and make sure it exists.
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
