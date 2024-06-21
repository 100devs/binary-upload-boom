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
const commentRoutes = require("./routes/comments");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" }); //Allows environment files to run and work

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs"); //Without this line, we wouldn't know which views to use

//Static Folder
app.use(express.static("public")); //public folder hosts all static files so we don't have to write individual routes + controllers for them

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  //this line and the one above replace body parser- parses stuff that comes out of the body. pulls data from the body

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));   //Uses methodOverride package and looks for query parameter, '_method', and looks for it in all post requests

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

//Setup Routes In Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {  //Uses env variable for the port for deployment/hosting
  console.log("Server is running, you better catch it!");
});
