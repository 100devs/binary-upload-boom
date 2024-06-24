const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.post("/createComments/:id&:user", commentsController.createComments);
router.delete("/deleteComments/:id&:post", commentsController.deleteComments);
router.put("/likeComments/:id&:post", commentsController.likeComments);

module.exports = router;
