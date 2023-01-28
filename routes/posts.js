const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// id is a query parameter, pulls the id out of the URL (everything after /)
router.get("/:id", ensureAuth, postsController.getPost);

//post request, uses middleware to upload file, uses post controller and create post method
router.post("/createPost", upload.single("file"), postsController.createPost);

//put request, uses post ID from request, using post controller and like post method
router.put("/likePost/:id", postsController.likePost);

//delete request, uses post ID from request, using post controller and delete post method
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
