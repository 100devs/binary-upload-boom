const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req, res) => { //Post request for creating a comment
    try {
      await Comment.create({ //creates post
        comment: req.body.comment, //Gets comment from body
        post: req.params.id, //Gets post from params.id
        user: req.user.id, //Gets Id of user
        userName: req.user.userName //Gets userName
      });
      console.log("Comment has been added!"); //Console.log
      res.redirect("/post/"+req.params.id); //redirects to /post
    } catch (err) { //Errors
      console.log(err);
    }
  },
};

// const Comment = require("../models/Comment");

// module.exports = {
//   createComment: async (req, res) => {
//     try {
//       await Comment.create({
//         comment: req.body.comment,
//         user: req.user.id,
//         post: req.params.id,
//       });
//       console.log("Comment has been added!");
//       res.redirect("/post/posts/" + req.params.id);
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };
