const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const providersController = require("../controllers/providers");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Provider Routes - simplified for now
router.get("/:id", ensureAuth, providersController.getProvider);

router.post("/createProvider", upload.single("file"), providersController.createProvider);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteProvider/:id", providersController.deleteProvider);

module.exports = router;
