const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/makeComment/:id", commentsController.makeComment);
router.get("/getComments/:id", commentsController.getComments);

module.exports = router;
