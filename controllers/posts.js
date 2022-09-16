const cloudinary = require("../middleware/cloudinary"); //Requiring cloudinary
const Post = require("../models/Post"); //Mongoose model that references a schema
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }); // find all the posts of the logged in user
      res.render("profile.ejs", { posts: posts, user: req.user }); //get the user profile and render it. Passing the data of the user's posts through a variable down into the view. This is regular data now. Also getting info about the user from the request. 
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); // find and sort in descending order. lean makes it way faster to get the info you need. lean is mongoose helping us. Post is the name of a model which contains a schema. 
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id); // going to find a specific doc based on its ID (aka the specific ID of that post). We have a Post model that we are going into that will be specifying a specific collection and then the specific ID that we passed up. Look in the req = request and look for a variable of some kind (params) and I expect that variable is going to be called id. Post is a model (use the Post model to look in the posts collection).
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments }); // user property is on the request in the session that comes through so I can grab it. Just to render another view, and taking the data that we found in the DB and we are passing certain elements that we grabbed from the DB and sending them with that view so you can use them. 
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path); // hand off image from middleware to cloudinary so it can come back with the url. The req.file.path is the location of the file wherever it's been saved. Can console.log(req.file.path) to see the direction of the path. Now the image will be hosted, but the data in the db still needs to be created.

      await Post.create({ // another call that is contacting MongoDB. Post is referencing the Mongoose model called "Post". 
        title: req.body.title, // form data that specifies each of the components we are passing into the model and the model is going to pass that into the schema and build a database with it. 
        image: result.secure_url, // cloudinary data
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0, // manually putting in information
        user: req.user.id, // middleware data coming from passport
      });
      console.log("Post has been added!");
      res.redirect("/profile"); // go to server.js to see the path. It will show all the posts the user submitted, including the newly created post. 
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id }, // find that post based on the specific id
        {
          $inc: { likes: 1 }, // we are going to increment the likes property by 1
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
