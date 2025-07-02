//modules needed for posts routes 
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); //posts/:id route, GET request based on a post ID, ensure user is logged in first

router.post("/createPost", upload.single("file"), postsController.createPost); //posts/createPost route, POST request using the file uploaded

router.put("/likePost/:id", postsController.likePost); //posts/likePost/:id, PUT request liking a post 

router.delete("/deletePost/:id", postsController.deletePost); //posts/deletePost/:id, DELETE request deleting a post

module.exports = router;
