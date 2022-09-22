const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment); // submit form, server.js sends us to the router which hears the createComment/:id which is a post which points us to commentsController with the createComment method

// router.delete("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;
