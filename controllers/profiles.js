const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User")

module.exports = {
  getProfile: async (req, res) => {
    try {
        const profile = await Post.findById(req.params.id);
        const posts = await Post.find({ user: req.params.id });
        res.render("profile.ejs", { posts: posts, user: req.user, paramsID: req.params.id });
    } catch (err) {
      console.log(err);
    }
  },
  notLoggedIn: (req, res) => {
    console.log('Please login to access profiles page. Redirecting...')
    res.redirect('/')
  }
};