const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;


/*
The code you've provided defines a set of routes related to posts in an Express.js application. These routes handle various actions related to posts, such as creating, viewing, liking, and deleting posts. Let's break down what each route does:

    const express = require("express");:
        This line imports the express framework, which is used to create and configure routes for your web application.

    const router = express.Router();:
        This code creates a new instance of an Express router. Routers allow you to group and define routes and associated middleware.

    Middleware and Controllers:
        The code imports middleware and controller functions from separate modules using require. The middleware includes upload (likely for handling file uploads) and authentication middleware (ensureAuth). The controller functions are from the postsController.

    Post Routes:

        The following routes are defined using the router:

        /:id (GET): This route is parameterized with :id and is accessed with a GET request. It invokes the getPost function from the postsController to display a specific post based on its ID. The ensureAuth middleware ensures that only authenticated users can view posts.

        /createPost (POST): This route is accessed with a POST request and is likely used to create a new post. It uses the upload middleware (possibly for handling file uploads) and invokes the createPost function from the postsController. The function is responsible for creating a new post and is expected to handle the file upload and post creation logic.

        /likePost/:id (PUT): This route is parameterized with :id and is accessed with a PUT request. It invokes the likePost function from the postsController. This route is likely used to allow users to like a specific post. The post's ID is included in the URL, and the likePost function is responsible for updating the post's like count.

        /deletePost/:id (DELETE): This route is parameterized with :id and is accessed with a DELETE request. It invokes the deletePost function from the postsController. This route is likely used to allow users to delete a specific post based on its ID.

    module.exports = router;:
        This code exports the router instance, making it available for use in your main Express application. You would typically mount this router in your main app file using app.use() to define the URL paths where these routes should be accessible.

These routes provide basic functionality for managing posts, including creation, viewing, liking, and deletion. Depending on your application's requirements, you would implement the logic in the respective controller functions to handle these actions and interact with your database.


*/