//const Post = require("../models/Post"); //dont need
const Comment = require("../models/Comment")

module.exports = {
   createComment: async (req, res) => {
        try {
        await Comment.create({
            comment: req.body.comment,
            likes: 0,
            post: req.params.id,
        });
        console.log("Comment has been added!");
        res.redirect("/post/" + req.params.id);
        } catch (err) {
        console.log(err);
        }
    }
};

//add user








// //const Post = require("../models/Post"); //dont need
// const Comment = require("../models/Comment")

// module.exports = {
//    createComment: async (req, res) => {
//         try {
//         await Comment.create({
//             comment: req.body.comment,
//             user: req.user.id,            
//             likes: 0,
//             postId: req.params.postId
//         });
//         console.log("Comment has been added!");
//         res.redirect(`/post/${req.params.postId}`);
//         } catch (err) {
//         console.log(err);
//         }
//     }
//     // deleteComment: async (req, res) => {
//     //     try {
//     //       // Find comment by id
//     //       let comment = await Comment.findById({ _id: req.params.commentId });
//     //       // Delete post from db
//     //       await Post.remove({ _id: req.params.commendId });
//     //       console.log("Deleted Comment");
//     //       res.redirect(`/post/${req.params.id}`);
//     //     } catch (err) {
//     //       res.redirect(`/post/${req.params.id}`);
//     //     }
//     //   },
// //   likeComment: async (req, res) => {
// //     try {
// //       await Post.findOneAndUpdate(
// //         { _id: req.params.id },
// //         {
// //           $inc: { likes: 1 },
// //         }
// //       );
// //       console.log("Likes +1");
// //       res.redirect(`/post/${req.params.id}`);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   },
  
// };
