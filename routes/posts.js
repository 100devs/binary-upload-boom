const express = require("express"); // importing express framework so this file can use it
const router = express.Router(); // creates router for post-related requests
const upload = require("../middleware/multer"); // allows use of middleware for handling file uploads
const postsController = require("../controllers/posts"); // connects the post route to the post controller
const { ensureAuth, ensureGuest } = require("../middleware/auth"); // imports authentication middleware 

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); // handles a get request for a post on the website and checks the user is authorized. Then runs getPost function from posts controller

router.post("/createPost", upload.single("file"), postsController.createPost); // post request, uploads a file, and runs createPost from controlled

router.put("/likePost/:id", postsController.likePost); // put request recieved directly from the view, runslikePost function from controller

router.delete("/deletePost/:id", postsController.deletePost); // view sends delete request and route sends it to controller to delete post

module.exports = router; // exports router files to whichever file imports it
