const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const commentController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


router.post("/addComments/:id", ensureAuth, commentController.addComment);


module.exports = router;
