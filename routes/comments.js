const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//router.get("/:id", commentsController.getComment); //waits for a path that contains just an id.

router.post("/createComment/:id", commentsController.createComment);

//router.put("/likeComment/:id", commentsController.likeComment);

//router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
