const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const medsController = require("../controllers/meds");
dashboardController = require("../controllers/dashboard");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Med Routes - simplified for now
router.get("/:id", ensureAuth, medsController.getMed);

router.post("createMed", upload.single("file"), medsController.createMed);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteMed/:id", medsController.deleteMed);

module.exports = router;

