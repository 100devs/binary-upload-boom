// const cloudinary = require("../middleware/cloudinary");
// const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      //future implementation
      // Upload image to cloudinary
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
        likes: 0,
        // likedBy: [],
        user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  // getProfile: async (req, res) => {
  //   try {
  //     const posts = await Post.find({ user: req.user.id });
  //     res.render("profile.ejs", { posts: posts, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getFeed: async (req, res) => {
  //   try {
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // include comments per post
  // getPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();

  //     res.render("post.ejs", { post: post, comments: comments, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // need to prevent the same user from liking a post more than once
  // add a property to the post model for likedBy. 
  // check condition before find one and update.
  // if user is in likedBy array, likes: -1 and remove user from array. if user is not in array, likes: 1 and add user to array.
  // likePost: async (req, res) => {
  //   try {
  //     const post = await Post.find({_id: req.params.id})
  //     // console.log(post);
  //       if (post[0].likedBy.includes(req.user.id)){
  //         await Post.findOneAndUpdate(
  //           { _id: req.params.id },
  //           {
  //             $inc: { likes: -1 },
  //             $pull: {likedBy: req.user.id}
  //           }
  //         );
  //         console.log("Likes -1");
  //       } else {
  //         await Post.findOneAndUpdate(
  //           { _id: req.params.id },
  //           {
  //             $inc: { likes: +1 },
  //             $push: {likedBy: req.user.id}
  //           }
  //         );
  //         console.log("Likes +1");
  //       }
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
};
