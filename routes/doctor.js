const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const doctorsController = require("../controllers/doctors");
const providersController = require("../controllers/providers");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Doctor Routes - simplified for now
router.get("/:id", ensureAuth, doctorsController.getDoctor);
router.get("/:id", ensureAuth, providersController.getProvider);

router.post("createDoctor", upload.single("file"), doctorsController.createDoctor);
router.post("createProvider", upload.single("file"), providersController.createProvider);


// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteDoctor/:id", doctorsController.deleteDoctor);
router.delete("/deleteProvider/:id", providersController.deleteProvider);


module.exports = router;
