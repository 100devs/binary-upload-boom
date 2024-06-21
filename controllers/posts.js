const cloudinary = require('cloudinary').v2;
const Post = require("../models/Post");
const Comment = require("../models/Comment")

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
      res.json({ posts: posts });
      console.log(posts)
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },

// ...

createPost: async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    await Post.create({
      title: req.body.title,
      image: result.secure_url, // Use the Cloudinary image URL
      cloudinaryId: result.public_id, // Save the Cloudinary public ID for further operations if needed
      caption: req.body.caption,
      likes: 0,
      user: 'test',
    });
    console.log("Post has been added!");
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
},

  likePost: async (req, res) => {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        },
        { new: true } // Add this option to return the updated document
      );
  
      console.log("Likes +1");
      res.json({ likes: updatedPost.likes }); // Return the updated number of likes
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
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
