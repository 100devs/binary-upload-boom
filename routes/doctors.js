const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const doctorsController = require("../controllers/doctors");
const bodyParser = require      
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Care providers routes. Info about the user's doctors
router.get(":id", ensureAuth, doctorsController.getDoctor);

router.post("/createDoctor", upload.single("file"), doctorsController.createDoctor);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteDoctr/:id", doctorsController.deleteDoctor);

module.exports = router;
