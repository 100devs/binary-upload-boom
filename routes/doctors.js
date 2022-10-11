const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const doctorsController = require("../controllers/doctors");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Med Routes - simplified for now
router.get("/:id", ensureAuth, doctorsController.getDoctor);

router.post("/createDoctor", upload.single("file"), doctorsController.createDoctor);

router.delete("/deleteDoctor/:id", doctorsController.deleteDoctor);

module.exports = router;
