const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const discsController = require("../controllers/discs");
const commentController = require("../controllers/comments");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Disc Routes 
router.get("/:id", ensureAuth, discsController.getDisc);

router.post("/createDisc", upload.single("file"), discsController.createDisc);

router.post("/createComment", commentController.createComment);

router.put("/likeDisc/:id", discsController.likeDisc);

router.delete("/deleteDisc/:id", discsController.deleteDisc);

module.exports = router;
