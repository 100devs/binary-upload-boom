const Comments = require("../models/Comments");

module.exports = {
    createComments: async (req, res) => {
        try {
        await Comments.create({
            comment: req.body.comment,
            likes: 0,
            createdBy: req.user.userName,
            user: req.params.user,
            post: req.params.id,
        });
        console.log("Comment has been added!");
        res.redirect("/post/" + req.params.id);
        } catch (err) {
        console.log(err);
        }
    },
    deleteComments: async (req, res) => {
        try{
            // Delete Comment from db
            await Comments.remove({ _id: req.params.id });
            console.log("Deleted Comment");
            res.redirect("/post/" + req.params.post);
        } catch(err){
            res.redirect("/post/" + req.params.post);
        }
    },
    likeComments: async (req, res) => {
        try {
          await Comments.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes +1");
          res.redirect(`/post/${req.params.post}`);
        } catch (err) {
          console.log(err);
        }
      },
}