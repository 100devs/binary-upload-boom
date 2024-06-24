const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipesController = require("../controllers/recipe");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, recipesController.getRecipe);


router.post("/createRecipe", upload.single("file"), recipesController.createRecipe);

router.put("/likeRecipe/:id", recipesController.likeRecipe);
router.post("/favoriteRecipe/:id", recipesController.favoriteRecipe);
// router.put("/favoriteRecipe/:id", recipesController.favoriteRecipe);

router.delete("/deleteRecipe/:id", recipesController.deleteRecipe);

module.exports = router;
