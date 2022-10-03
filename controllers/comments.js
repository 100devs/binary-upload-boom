const Disc = require("../models/Disc");
const Comment = require("../models/Comment");


module.exports = {
  createComment: async (req, res) => {
    try {

      await Comment.create({
        comment: req.body.comment,
        disc: req.params.id,
        likes: 0,
      });
      console.log("Comment has been added!");
      res.redirect("/disc/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

};


