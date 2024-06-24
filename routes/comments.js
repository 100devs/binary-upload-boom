const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now

// the :id is like setting up a query parameter to grab value out of the URL

router.post("/createComment/:id", commentsController.createComment);

// router.put("updateComment/:id", commentsController.updateComment);



//the : means that there are variables
//two parameters are being passed in at the same time
router.delete("/deleteComment/:postid/:commentid", commentsController.deleteComments)


module.exports = router;
