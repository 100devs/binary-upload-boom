const cloudinary = require("../middleware/cloudinary");
const User= require("../models/User")
const Post = require("../models/Post");
const { request } = require("express");
const comment = require("../models/comment");

module.exports = {
  
  createComment: async (req, res) => {
    try {
      const userid =await User.findById(req.user.id)
        await comment.create({
        comment: req.body.comments,
        user: userid,
        post: req.params.id,
        
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } 
    catch (err) {
      console.log(err);
    }
  }

//   deletePost: async (req, res) => {
//     try {
//       // Find post by id
//       let post = await Post.findById({ _id: req.params.id });
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(post.cloudinaryId);
//       // Delete post from db
//       await Post.remove({ _id: req.params.id });
//       console.log("Deleted Post");
//       res.redirect("/profile");
//     } catch (err) {
//       res.redirect("/profile");
//     }
//   },
 };
