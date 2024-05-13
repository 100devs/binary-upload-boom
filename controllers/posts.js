const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      //find all post for this user
      const posts = await Post.find({ user: req.user.id });
      //render it on profile page with data from db users post
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      //search Post model search post by its id
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      //render post on feed
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      //search Post model search post by its id-req.params.id = request id parameter
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();
      //render post on post page-req.user user currently logged in
      res.render("post.ejs", {
        post: post,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload file image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //create new post in db
      await Post.create({
        //grab title from form
        title: req.body.title,
        //grab url from image
        image: result.secure_url,
        //
        cloudinaryId: result.public_id,
        //grab caption from form
        caption: req.body.caption,
        //hard code likes
        likes: 0,
        //what user logged in ids
        user: req.user.id,
      });
      console.log("Post has been added!");
      //redirect back to profile route
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
      //redirect back to the post they were on
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
