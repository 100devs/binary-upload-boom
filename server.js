
// import express
const express = require("express");
// run express
const app = express();
//import mongoose
const mongoose = require("mongoose");
//import passport
const passport = require("passport");
//import session
const session = require("express-session");
//import mongostore to work w/ session
const MongoStore = require("connect-mongo")(session);
//import method override
const methodOverride = require("method-override");
//import flash
const flash = require("express-flash");
//import morgan logger
const logger = require("morgan");
//import function to connect to DB
const connectDB = require("./config/database");
//import main routes
const mainRoutes = require("./routes/main");
//import post routes
const postRoutes = require("./routes/posts");

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
    secret: process.env.SESSION_SECRET,
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

//make user accesible in all ejs files
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
}) 

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
//sends any url with /post to post router
app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
