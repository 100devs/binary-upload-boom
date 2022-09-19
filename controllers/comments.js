const Comment = require("../models/Comment");

//add Post model
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {
      //const commentUser = await User.findById(req.user.id)
      // creates a new comment
      const comment = await Comment.create({
        title: req.body.title,
        body: req.body.body,
        createdBy: req.user.userName,
        createdByID: req.user.id
      });

      //add the id of the comment to the array in the post document
      Post.findById(req.params.id, (err, post) => {
        post.comments.push(comment.id)
        post.save()
      })

      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
  },
  deleteComments: async (req, res) => {
    try {
      await Comment.deleteOne({_id: req.params.commentid})
      res.redirect("/post/"+req.parmas.postid);
    } catch(err) {
      console.log(err);
    }
  }
};
