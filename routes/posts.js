//  Use express package
const express = require("express");
// Use express Router method to be able to direct to routers 
const router = express.Router();
//Use multer to upload media from the client
const upload = require("../middleware/multer");
//Pathway to posts Controller 
const postsController = require("../controllers/posts");
//Require the middleware for ensureAuth that will check to see if a user is logged in 
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// with posts/:id (of post) make sure they are logged in and get the POST
router.get("/:id", ensureAuth, postsController.getPost);

//on posts/createPost upload a file using muelter and go to the postsController and run createPost
router.post("/createPost", upload.single("file"), postsController.createPost);

// simple routers 
router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

//export the router info to the server.js file 
module.exports = router;
