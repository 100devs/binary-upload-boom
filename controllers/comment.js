const Comment = require("../models/Comment");

createComment: async (req, res) => {
    try {
      // console.log(req.params.id) if not working
      await Comment.create({

        Comment: req.body.comment,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        post: req.params.id,
        user: req.user.id,
        username: req.user.userName,

      });
      console.log("Comment has been added!");
      res.redirect("/post/"+ req.params.id);
    } catch (err) {
      console.log(err);
    }
  },