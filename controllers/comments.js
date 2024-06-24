//const cloudinary = require("../middleware/cloudinary");
//const Post = require("../models/Post");
const Comments = require("../models/Comment");
const User = require("../models/User");

module.exports = {
    createComment: async (req, res) => {
        try {
            let commentUser = await User.findById(req.user.id)
            console.log(commentUser.userName)
            await Comments.create({
                comment: req.body.comment,
                likes: 0,
                post: req.params.id,
                user: commentUser
            });
            console.log("Comment has been added!");
            res.redirect("/post/" + req.params.id);
        } catch (err) {
            console.log(err);
        }
    },
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
    deleteComment: async (req, res) => {
        try {
            const comment = await Comments.findById( { _id: req.params.id})
            await Comments.deleteOne({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect("/post/" + comment.post);
        } catch (err) {
            res.redirect("/profile");
        }
    },
};
