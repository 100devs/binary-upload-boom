const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User")
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
      // we're finding them a sorting them in descending order
      // .lean() --> so collections have documents an documents are kind of like objects, but they have way more things in them than objects, so .lean() makes it so that we get a regular plain ole' object. This makes the process way faster. It's from mongoose
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); 
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // params.id is used for the parameters we defined in our post router file
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post: post._id});

      res.render("post.ejs", { post: post, user: req.user, comments:comments});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      // and Multer is helping us get that file uploaded
      // what are we awaiting from cloudinary?
      // we need cloudinary to upload it to their server and provide the url
      console.log(req.file)
      console.log(req.file.path)
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("this is result " + result)
      console.log("this is result " + result.secure_url.at, result.public_id)

      await Post.create({
        title: req.body.title, // remember body is from the form's name property
        image: result.secure_url,
        cloudinaryId: result.public_id, // we need this id and url above to later delete the file from cloudinary
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

  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        user: req.user.id,
        userName: req.user.userName,
      })
      res.redirect(`/post/${req.params.id}`)
    } catch(err) {
      console.log(err)
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comment.remove({_id: req.params.id})
      res.redirect(`/post/${req.params.postId}`)
      console.log('comment deleted')
    } catch(err) {

    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id }, //remember the 'id' parameter is set by the router
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
      // leon says we technically don't need this let post = ~~~ part
      // but its more for like to make sure that post actually exists before
      // sending a request to cloudinary for destruction
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
