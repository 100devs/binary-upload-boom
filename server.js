const express = require("express"); // Pulling in Express which allows us to simplify the syntax in our code 
const app = express(); // Constrains express to app making it more readable
const mongoose = require("mongoose"); // Middleware which introduces schemas to our mongoDB database
const passport = require("passport"); // Middleware that allows us to use different log-in authentication strategies
const session = require("express-session"); // Middleware that manages each log-in session for a user by creating a cookie
const MongoStore = require("connect-mongo")(session); // Middleware that creates session storage with mongoDB
const methodOverride = require("method-override"); // Middleware that allows us to put PUT and DELETE methods in our form POST method so we don't have to use front-end JS to facilitate updating/deleting database entries
const flash = require("express-flash"); // Middleware that introduces "flash" messages or pop-ups that we can use such as with our log-in/log-out processes
const logger = require("morgan"); // Logs HTTP requests and errors
const connectDB = require("./config/database"); // ROOT > CONFIG (FOLDER) > DATABASE.JS 
const mainRoutes = require("./routes/main"); // ROOT > ROUTES (FOLDER) > MAIN.JS
const postRoutes = require("./routes/posts"); // ROOT > ROUTES (FOLDER) > POSTS.JS
const commentRoutes = require("./routes/comments")


//Use .env file in config folder which contains our authentication information for services.
require("dotenv").config({ path: "./config/.env" });

// Passport config which pulls in our passport methods, can use it now with passport.
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder available to front-end 
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
    secret: "keyboard cat", // Used to help in randomizing hashes
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
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
