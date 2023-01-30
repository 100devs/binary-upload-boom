const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");

router.post("/createComment/:id", commentController.createComment);
// Post request which uploads a single file and directs to the post controller and the create post method. It uploads to Multer as seen above.


module.exports = router;
