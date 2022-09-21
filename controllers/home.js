const Post = require("../models/Post");

module.exports = {
  getIndex: async (req, res) => {
    let posts, user;
	try {
		if(req.user) {
		const allPosts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" });
			posts = allPosts.filter(post => post.image);
			user = req.user;
			res.render("index.ejs",{ posts: posts, user: req.user });	
		} else {
			res.render("index.ejs");
			
		}
    } catch (err) {
      console.log(err);
    } 
  },
};
