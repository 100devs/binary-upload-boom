const Language = require("../models/Language");

module.exports = {
  getLangComp: (req, res) => {
    res.render("langChoice.ejs");
  },
  createTable: async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
          res.render("post.ejs", { post: post, user: req.user, comments: comments});
        } catch (err) {
          console.log(err);
        }
      },
    
};