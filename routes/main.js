const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const productsController = require("../controllers/products");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const upload = require("../middleware/multer")

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/customerLogin", authController.getCustomerLogin);
router.get("/companyLogin", authController.getCompanyLogin);
router.post("/companyLogin", authController.postCompanyLogin);
router.get("/customerProfile", ensureAuth, productsController.getCustomerProfile);
router.get("/companyProfile", ensureAuth, productsController.getCompanyProfile);
router.get("/feed", ensureAuth, productsController.getFeed);
router.post("/customerLogin", authController.postCustomerLogin);
router.get("/logout", authController.logout);
router.get("/customerSignup", authController.getCustomerSignup);
router.get("/companySignup", authController.getCompanySignup);
router.post("/customerSignup", authController.postCustomerSignup);
router.post("/companySignup", upload.single('file'), authController.postCompanySignup);

module.exports = router;
