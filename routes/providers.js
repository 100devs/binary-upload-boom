const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const providersController = require("../controllers/providers");
const doctorsController = require("../controllers/doctors");
const bodyParser = require      
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Care providers routes. Info about the user's doctors
router.get(":id", ensureAuth, providersController.getProvider);

router.post("/createProvider", upload.single("file"), providersController.createProvider);

router.post("/createDoctor", upload.single("file"), doctorsController.createDoctor);

router.delete("/deleteProvider/:id", providersController.deleteProvider);

module.exports = router;
