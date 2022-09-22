const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


router.post("/createComment/:id", commentController.createComment);

router.put("/likeComment/:id", commentController.likeComment);


module.exports = router;
