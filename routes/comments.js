const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

<<<<<<< HEAD
//Post Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment);

module.exports = router;
=======
//Comment Routes - simplified for now
router.post("/createComment/:id", commentsController.createComment);


module.exports = router;
>>>>>>> 4129bedfe93ac30e728fa18acb1dfb96632d4d30
