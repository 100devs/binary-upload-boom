const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getProfile: async (req, res) => {
    try {
      // find posts that match the logged in user's id
      const posts = await Post.find({ user: req.user.id });
      //tells the view to render the above posts in the EJS
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      // uses the model to grab all posts in the DB and sorts in descending order according to creation date. .lean() returns a JS object instead of the whole mongoose document
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      //tells the view to render the above posts in the EJS
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // req.params.id comes from the route query parameter (which comes from the request in the anchor tag in EJS)
      //find the document that has the ID of x
      const post = await Post.findById(req.params.id);
      // pass that document into our EJS
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
// passes the request through to the Post model following the schema
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      // console logs once post has uploaded 
      console.log("Post has been added!");
      // refresh to show new post
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        // tells model to find post that matches ID in request
        { _id: req.params.id },
        {
          //increase the likes by 1
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      // refresh page to show new likes
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
