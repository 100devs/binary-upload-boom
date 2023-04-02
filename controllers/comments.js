const Comments = require("../models/Comments")

module.exports = {
    postComment: async (req, res) => {
        try {
            await Comments.create({
            comment:req.body.comment,
            likes: 0,
            commentId: req.params.id,
          });
          console.log("Comment has been added!");
          res.redirect("/profile");
        } catch (err) {
          console.log(err);
        }
      },
    }
