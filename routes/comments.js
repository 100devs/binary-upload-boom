const express = require("express");
const router = express.Router();
const commentscontroller = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

router.post("/createComment/:id", commentscontroller.createComment);



module.exports = router;
