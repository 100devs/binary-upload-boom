const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

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
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      //const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      let comments = await Comment.aggregate(
        [
          //Find all the posts with a post value that matches the postID of the post we are currently looking at
          {
            $match: {
              $expr: {
                $eq: ['$post', { $toObjectId: req.params.id } ]
              }
            }
          },
          //Grab the users collection, compare the user field on the comments collection to the _id field on the users collection. Return the entire document from the users collection if the id's match. Name that new field userInfo on the comment document.
          {
            $lookup:  {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "userInfo"
            }
          },
          //Flaten the userInfo field so it is not an array.
          {
            $unwind: "$userInfo"
          },
          //Add a field to the comment document that holds the userName from inside the userInfo field added above.
          {
            $addFields: {
              "userName": "$userInfo.userName",
            }
          },
          //Show only the relevant fields to a comment, so we aren't passing things like our hashed user password to the client
          {
            $project: {
              comment: 1,
              userName: 1,
              createdAt: 1
            }
          },
          //Show oldest comments first
          {
            $sort: {
              createdAt: 1,
            }
          }
        ]
      )
      //Log the retrieved comments to the console
      await console.log(comments);
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