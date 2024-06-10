const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Profile");
const FriendFinder = require("../models/FriendFinder")

const Comment = require("../models/Comment")
module.exports = {
 


  //request to render a page of all the users post aka the fee
  getFeed: async (req, res) => {
    try {
      //find all the post in the database buy all users sort them and place assign them to post varible.Using LEAN method taking only the parts we want
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      //render the page passing the posts
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
 
};
