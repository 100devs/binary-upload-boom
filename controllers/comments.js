const Comment = require("../models/Comment");
// Get post Schema in order to find parent Post
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    console.log(req.body)
    try {
      // store new comment object in newComment
      const newComment = await Comment.create({
        title: req.body.title,
        body: req.body.body,
      });
      // find parent Post using req.params.id
      // push newComment into parent Post, save Post
      Post.findById(req.params.id, (err, post) => {
        post.comments.push(newComment.id);
        post.save();
        console.log(post);
      }); 
      console.log("Comment has been added!");
      res.redirect(req.get('referer'));
    } catch (err) {
      console.log(err);
      res.redirect('/profile');
    }
  },
};
