const express = require("express"); //help build out api
const app = express(); //wherever you see app that is us using express
const mongoose = require("mongoose"); //help talk to our MongoDB database
const passport = require("passport"); //using for authentication, off the shelf strategies
const session = require("express-session"); //need for users to stay logged in across the app, uses cookies
const MongoStore = require("connect-mongo")(session); //storing our session in MongoDB, keeps you logged in
const methodOverride = require("method-override"); //override methods to be what we want, still using GET/POST
const flash = require("express-flash"); //show us our notifications 
const logger = require("morgan"); //logger, shows us all logged requests in termainal
const connectDB = require("./config/database"); //connect to database
const mainRoutes = require("./routes/main"); // routes for main page
const postRoutes = require("./routes/posts"); //routes for posts

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

//Body Parsing - pull stuff out of reqests
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
