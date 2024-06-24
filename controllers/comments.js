const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {

      const postExists = await Post.exists({ _id: req.params.id })

      if(postExists){
        const comment = await Comment.create({
          comment: req.body.comment,
          likes: 0,
          user: req.user.id,
          post: req.params.id, // post id url
        });

        // this may be unnecessay? but using populate in post controller not fully working
        const post = await Post.findById(req.params.id);
        post.comments.push(comment._id);
        await post.save();
        console.log("Comment has been added!");
        res.redirect(`/post/${req.params.id}`); // redirect back to post
      }
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid},
        { $inc: { likes: 1 }});
      console.log("Likes +1");
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.commentid)

      console.log("Deleted Post");
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      res.redirect(`/post/${req.params.postid}`)
      console.log(err);
    }
  },
};
