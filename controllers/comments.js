const Comment = require("../models/Comment");


module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // const post = await Post.findById(req.params.id);
      // let comment = await Comment.findById({ _id: req.params.id }); 
      let comment = await Comment.findOneAndDelete({ _id: req.params.id }); 
      console.log(comment)
      console.log(req.body.post)
      // await Comment.remove({ _id: req.params.id }); 
      console.log("Deleted Comment");
      // res.redirect(`/post/${req.body.post}`);
      // res.redirect(`/profile`);
      location.reload()
    } catch (err) {
      // res.redirect(`/post/${req.params.id}`);
      console.log(err)
    }
  },
};
