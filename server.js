const express = require("express");
const app = express();
const mongoose = require("mongoose"); //used for creating Models and managing Mongo data
const passport = require("passport"); //requires passport middleware for handling authentication
const session = require("express-session"); //requires sessions 
const MongoStore = require("connect-mongo")(session); //handles sessions and cookies
const methodOverride = require("method-override"); //use forms for put / delete requests
const flash = require("express-flash"); // sends error flash messages to client (e.g. when username is entered incorrectly)
const logger = require("morgan"); //logs http requests
const connectDB = require("./config/database"); // for connecting to DB
const mainRoutes = require("./routes/main"); //connects to main routes file
const postRoutes = require("./routes/posts"); //connects to post routes file
const commentRoutes = require("./routes/comments") //connects to comments routes file

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
app.use("/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
