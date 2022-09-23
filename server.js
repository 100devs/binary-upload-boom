const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport"); //pkg for auth
const session = require("express-session"); //cookies - token exchange
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash"); //errors or msgs
const logger = require("morgan"); //keep log events wo manual console log write ins
const connectDB = require("./config/database"); //notice a lot of the config is baked in
const mainRoutes = require("./routes/main"); //all routes
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

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

//Body Parsing - pulling needed out of reqs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging too noisy
// app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat", //randomized for unique str but could be anything - should be stored in .env. typically expire after certain period
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }), //same cookie fr user to restore same session - no need to relog in
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