const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;


/*
The code provided defines the main routes for an Express.js application. These routes are responsible for handling various user interactions, including authentication and accessing different parts of the application. Let's break down what each route does:

    const express = require("express");:
        This line imports the express framework, which is used to create and configure the routes and middleware for your web application.

    const router = express.Router();:
        This code creates a new instance of an Express router. Routers allow you to define groups of routes and middleware that can be mounted in your main Express application.

    Imported Controllers and Middleware:
        This section imports various controller functions and middleware from separate modules using require. These include authController, homeController, postsController, and ensureAuth and ensureGuest middleware functions.

    Main Routes:

        The following routes are defined using the router:

        /: This route, accessed with a GET request, invokes the getIndex function from the homeController. It is used to display the application's homepage.

        /profile: This route, accessed with a GET request, uses the ensureAuth middleware to ensure that the user is authenticated. If authenticated, it invokes the getProfile function from the postsController to display the user's profile.

        /feed: Similar to the "/profile" route, this route also uses the ensureAuth middleware to ensure authentication. It invokes the getFeed function from the postsController to display a feed of posts.

        /login: This route, accessed with a GET request, invokes the getLogin function from the authController to render a login form. It's typically used for user login.

        /login (POST): This route, accessed with a POST request, invokes the postLogin function from the authController to handle the login form submission. It includes form validation and authentication logic.

        /logout: This route, accessed with a GET request, invokes the logout function from the authController to log the user out of the application.

        /signup: This route, accessed with a GET request, invokes the getSignup function from the authController to render a signup form. It's typically used for user registration.

        /signup (POST): This route, accessed with a POST request, invokes the postSignup function from the authController to handle the signup form submission. It includes form validation and user registration logic.

    module.exports = router;:
        This code exports the router instance, making it available for use in your main Express application. You would typically mount this router in your main app file using app.use() to define the URL paths where these routes should be accessible.

These routes are a common structure for web applications that involve user authentication, profile pages, and feed-like functionality. Depending on your application's needs, you would implement the logic in the respective controller functions to handle user interactions and display the appropriate views.

*/
