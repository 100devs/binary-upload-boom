const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const configController = require("../controllers/config");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", configController.getConfig);
router.put("/imageAvatar", upload.single("file"), configController.imageAvatar);
router.put("/userName", configController.userName);


module.exports = router;