const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
/*
1. importing the express module and creating an Express application instance named app. Express is a popular Node.js web application framework that simplifies building web applications by providing various tools and middleware.

2. The line imports the mongoose library. Mongoose is an Object Data Modeling (ODM) library for MongoDB, which allows you to interact with MongoDB databases using JavaScript objects. In the code snippet you've provided, there's no database connection established yet, but it suggests that this application will likely connect to a MongoDB database using Mongoose.

3. Authentication with Passport.js Passport.js is a popular authentication middleware for Node.js applications. It's used for implementing user authentication strategies. In this code, you've imported the passport library, indicating that you'll be using it for authentication in your application.

4. Session Management with express-session: The express-session library is used for session management in Express applications. Sessions allow you to store data related to a user's interaction with your application across multiple requests. This is essential for features like user authentication and maintaining user sessions.

5.
*/


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
