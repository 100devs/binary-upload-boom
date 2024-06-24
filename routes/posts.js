const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);
// Grabs whatever is in the ID and sends it to the post controller for the getPost method. 

router.post("/createPost", upload.single("file"), postsController.createPost);
// Post request which uploads a single file and directs to the post controller and the create post method. It uploads to Multer as seen above.

router.put("/likePost/:id", postsController.likePost);
// Put request uses post ID and sends to the posts controller and the like post method.

router.delete("/deletePost/:id", postsController.deletePost);
// Delete request using the ID from the request. It sends the request to the posts controller and the delete post method.

module.exports = router;
