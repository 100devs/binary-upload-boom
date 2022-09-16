const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now :/id is just a varible or parameter to hold the url of the request after the / which is also the user id
router.get("/:id", ensureAuth, postsController.getPost);
//holding image checking if is an image file using multer method sanitize the data
router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
