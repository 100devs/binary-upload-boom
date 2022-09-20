const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Comment Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment);
// Colon syntax tells the router it's a variable that will change and we're passing them through to the controller.
router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComments);


module.exports = router;