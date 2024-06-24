const express = require("express"); //Allow access to express methods
const router = express.Router(); //Allows router method
const upload = require("../middleware/multer"); //Allows multer middleware
const postsController = require("../controllers/posts"); //Variable to controllers/post
const { ensureAuth, ensureGuest } = require("../middleware/auth");  //Allows for ensureAuth and ensureGuest from middleware/auth

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);//Routes to controllers/posts and runs getPost()-> Renders post.ejs of :id
router.post("/createPost", upload.single("file"), postsController.createPost); //Routes to controllers/posts and runs createPost() -> Accesses cloudinary upload protocol and creates post object
router.put("/likePost/:id", postsController.likePost); //Routes to contorllers/posts and runs likePost() -> +1 like protocol and redirects post/:id
router.delete("/deletePost/:id", postsController.deletePost); //Routes to controllers/posts and runs deletePost() -> Runs delete protocol and redirect /profile

module.exports = router;
