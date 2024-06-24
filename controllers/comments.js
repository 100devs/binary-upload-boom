const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { post } = require("../routes/main");

module.exports = {
  getComment: async (req, res) => {
    try {
      const comments = await Comment.findById(req.params._id);
      console.log(comments)
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        commentText: req.body.commentText,
        post: req.params.id,
        likes: 0,
        user: req.user.id,
        submittedBy: req.user.userName,
        createdAt: Date.now(), //this has parenths for some reason. The person who made the rules really sucks.
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      let returnRoute = await Comment.findById(req.params.id, 'post').lean();
        await Comment.findOneAndUpdate(
          { _id: req.params.id }, //parameter
          {
            $inc: { likes: 1 },  //output - $inc = increment
          },
        );
        res.redirect("/post/"+returnRoute.post);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
        //Find the 'post' property on our comment object that the comment is attached to
    let returnRoute = await Comment.findById(req.params.id, 'post').lean(); //returns an object with the id of the comment and its post property. We have the property in a variable so that we can reroute properly after the object no longer exists in our db.
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/post/"+returnRoute.post) //grabs the value on our return route object (which contains an id and a post property)
    } catch (err) {
      res.redirect("/post/"+returnRoute.post);
      console.log(err)
    }
  },
};
