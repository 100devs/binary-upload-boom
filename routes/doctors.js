const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const contactController = require("../controllers/contacts");
const doctorsController = require("../controllers/doctors");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Med Routes - simplified for now
router.get("/:id", ensureAuth, doctorsController.getDoctor);
router.get("/:id", ensureAuth, contactController.getContact);

router.post("/createDoctor", upload.single("file"), doctorsController.createDoctor);
router.post("/createContact", upload.single("file"), contactController.createContact);

router.delete("/deleteDoctor/:id", doctorsController.deleteDoctor);
router.delete("/deleteContact/:id", contactController.deleteContact);

module.exports = router;
