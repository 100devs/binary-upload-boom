const Comment = require("../models/Comment"); // imports the comment model so the controller can interact with it

module.exports = { // exports the createComment function so the comment route can access it
  createComment: async (req, res) => { // defines the createComment function and shows it's async. req is info about the request, and res is a tool for responding to the user
    try { // begins a try/catch error-handling block
      
      await Comment.create({ // controller tells the model to create a new comment using the information below. the await tells the function to wait for the database to finish creating the comment
        comment: req.body.comment, // left side is the property being created: right side is where the value comes from.
        likes: 0, // sets initial likes to 0 on comment
        post: req.params.id, // keeps track of what post the comment is associated with via the post id
      });
      console.log("Comment has been added!"); // if everything succeeds, this is printed to the console
      res.redirect("/post/" + req.params.id); // user is redirected to the post
    } catch (err) { // if something in the try block fails, it jumps to the catch block to throw an error
      console.log(err); // logs the error
    }
  },

};
