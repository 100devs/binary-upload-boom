const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); //brings in multer middleware for uploading multipart/form data
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); //gets post that is specified in query parameters

router.post("/createPost", upload.single("file"), postsController.createPost); //uses multer middleware to upload img with request

router.put("/likePost/:id", postsController.likePost); //adds like to post specified in query parameter

router.delete("/deletePost/:id", postsController.deletePost); //deletes post specified in query parameter

module.exports = router;
