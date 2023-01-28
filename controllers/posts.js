const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); //heads up that this is why I keep seeing posts in the ejs, we put it in a const, i was thinking it new posts from Post model, but really, we just set that here 
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
      const post = await Post.findById(req.params.id);//Post is the name we gave the model for each post, then mongoose created a collection called Posts so Post is one of the posts in Posts 
      //below use comments model to go to comments collection and find all of the comments that have a post property of the current post we are actually on 
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "asc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); //rascal said this is the filepath to the file in this case image, in your temp directory where multer saved it - in the request

      await Post.create({  //Post is the mongoose model, the Post model is building the new document with the schema
        title: req.body.title,
        image: result.secure_url, //from cloudinary above
        cloudinaryId: result.public_id, //from cloudinary above
        caption: req.body.caption,
        likes: 0, //set likes to 0 as default to start
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile"); //redirecting to the profile ROUTE which is a GET request on the mainRoutes/profile in server.js and we need to follow that get request on that route all the way through too.
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
      // Find post by id // really just finding out if it exists with this line
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
