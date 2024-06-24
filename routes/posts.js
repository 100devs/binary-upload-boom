const express = require("express"); //express
const router = express.Router(); //to route
const upload = require("../middleware/multer"); //to mult
const postsController = require("../controllers/posts"); //use the posts controller
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //make sure ya logged in

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); //use the post controller to get a post

router.post("/createPost", upload.single("file"), postsController.createPost); //use the post controller create method

router.put("/likePost/:id", postsController.likePost); //use the like method

router.delete("/deletePost/:id", postsController.deletePost); //use the dee lay tay method

module.exports = router; //export it
