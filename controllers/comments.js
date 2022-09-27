const Comment = require('../models/Comments')


module.exports = {
//   createComment: async(req, res) => {
//     try {
//       await Comment.create({
//         comment: req.body.comment, 
//         post: req.params.id,
//         likes: 0,
//       })
//       console.log('Added Comment')
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err)
//     }
//   },

  createComment: async (req, res) => {
    try {
        console.log(req)
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
