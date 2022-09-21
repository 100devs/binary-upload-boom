//create a new comments route in the routes folder
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");

//Comments - simplified for now
//router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createComment/:id", commentsController.createComment);

// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
