const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// user submits GET to 'slash' anything, we'll grab that as our 'id', ensure they are authenticated, and then called getPost method from postsController
router.get("/:id", ensureAuth, postsController.getPost);

// POST req to '/createPost' route, we upload file, and then go into our 'postsController' and call the 'createPost' method
router.post("/createPost", upload.single("file"), postsController.createPost);

// when user submits PUT req @ the route 'likePost/ANYTHING', the ANYTHING will become our 'id', then we go into our postsController and call the 'likePost' method
router.put("/likePost/:id", postsController.likePost);

// same idea as above, but with different route, and different method being callec
router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
