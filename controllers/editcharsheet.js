const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const EditCharSheet = require("../models/EditCharSheet");

module.exports = {
    createComment: async (req, res) => {
      try {
        await EditCharSheet.create({
          comment: req.body.comment,
          post: req.params.id,
          //user: req.user.id, // Unique ID, not currently in use
          createdByID: req.user.id, // Unique ID
          createdByUserName: req.user.userName, // User Name
        });
        console.log("Comment has been added!");
        res.redirect("/post/"+req.params.id);
      } catch (err) {
        console.log(err);
      }
    },
};