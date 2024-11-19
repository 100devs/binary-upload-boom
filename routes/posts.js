const express = require("express"); //initiates routes
const router = express.Router();
const upload = require("../middleware/multer"); //helps upload images
const postsController = require("../controllers/posts"); // where to find posts controller
const commentsController = require("../controllers/comments"); //adds comments controller
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //checks whether someone is logged in or not

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); // the colon with name after it gives you a variable you can use inside of your controller that will grab that value

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

//add post comment route
router.post("/createComment/:id", commentsController.createComment);

//delete a comment user posted
router.delete("/deleteComments/:postid/commentid", commentsController.deleteComments);

module.exports = router;
