const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createComment/:rainbow", commentsController.createComment);

module.exports = router;
