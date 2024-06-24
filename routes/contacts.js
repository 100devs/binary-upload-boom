const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const contactController = require("../controllers/contacts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, contactController.getContact);

router.post("/createContact", contactController.createContact);


router.delete("/deleteContact/:id", contactController.deleteContact);

module.exports = router