const express = require("express"); // server-side web framework for Node.js; used to build API
const app = express(); // call express whenever we use app
const mongoose = require("mongoose"); // help us talk to MongoDB database
const passport = require("passport"); // used for authentication; can use different strategies/logins (Google, Twitter, etc.)
const session = require("express-session"); // session keeps user logged in as they move around app; session uses cookies (stored on client-side)
const MongoStore = require("connect-mongo")(session); // stores user's session in MongoDB; keeps user logged in even when they leave page; session is an argument being passed in
const methodOverride = require("method-override"); // browser only does GET and POST methods; web APIs used for PUT and DELETE; override methods so that we don't have to worry about what client-side gives us
const flash = require("express-flash"); // shows notifications/error messages
const logger = require("morgan"); // keeps track in terminal (logs requests)
const connectDB = require("./config/database"); // connect to database
const mainRoutes = require("./routes/main"); // different routes for main, post, comments
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); // env needed, but not built-in; need to require from config folder

// Passport config
require("./config/passport")(passport); // require file and execute the file that gets returned with passport as argument

//Connect To Database
connectDB(); // database file inside of config folder to connect to database

//Using EJS for views
app.set("view engine", "ejs"); // using EJS as template engine

//Static Folder
app.use(express.static("public")); // static assets like HTML, CSS, JS files

//Body Parsing
app.use(express.urlencoded({ extended: true })); // pull stuff out of requests (form) being made
app.use(express.json());

//Logging
app.use(logger("dev")); // using morgan for logging

//Use forms for put / delete
app.use(methodOverride("_method")); // any request with query parameter of "_method", override it and do whatever comes after it like PUT or DELETE; app being used in browser and browser only exposes natively GET and POST 

// Setup Sessions - stored in MongoDB
app.use( // setting up session so user can stay logged in and storing it in database
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize()); // using passport with authentication
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
