const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); //upload is used below on the createPost route
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //This is so the 'ensureAuth' method can be called the the get('/:id') route

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); //remember colon syntax grabs everything after the slash, and we store it in a variable called 'id', which is referenced in the posts controller (and also "ensureAuth" is middleware that makes sure you are logged in)

router.post("/createPost", upload.single("file"), postsController.createPost); //upload.single("file") is middleware (multer)

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
