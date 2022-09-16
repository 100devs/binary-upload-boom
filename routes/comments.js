const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const commentController = require("../controllers/comments")

//Post Routes - simplified for now

router.post("/createComment/:id",commentController.createComment);


module.exports = router;
