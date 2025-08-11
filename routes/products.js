const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require("../controllers/products");

const { ensureAuth, ensureGuest } = require("../middleware/auth");
const products = require("../controllers/products");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, productController.getProduct);

router.post("/createProduct", upload.single("file"), productController.createProduct);

router.put("/rateProduct/:id", productController.rateProduct);

router.delete("/deleteProduct/:id", productController.deleteProduct);

router.post("/addComment/:id", productController.addComment);

router.post("/filterProducts", productController.filterProducts);

router.delete('/deleteComments/:id', productController.deleteComments)



module.exports = router;
