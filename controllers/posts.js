const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
//load comment model
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {

      //console.log(req.user)
      //go to post, find a document user prop of logged in user
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      //find posts sort in descending order
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err); 
    }
  },
  //post controller
  getPost: async (req, res) => {  
    //console.log(req)
    //console.log(req.params)
    //console.log(req.user)
    try {
      //find specfic doc based on id
      //req.params.id grab value that in url
      const post = await Post.findById(req.params.id);

      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      //const post = await Post.findById(req.params.rainbowUnicorn);

      //
      

      //property of comments = to match id of collection we are on
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
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
      //confirm post exisits
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
