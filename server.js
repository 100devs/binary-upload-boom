const express = require("express"); // helps build our api easily
const app = express(); 
const mongoose = require("mongoose"); // used to easily talk to our MongoDB database
const passport = require("passport"); // enables strategies for authentication
const session = require("express-session"); // used to create sessions to stay logged in
const MongoStore = require("connect-mongo")(session); // used to store sessions in MongoDB
const methodOverride = require("method-override"); // overrides POST and GET methods.
const flash = require("express-flash"); // used to show any errors
const logger = require("morgan"); // used to display info in the console in a nicer way
const connectDB = require("./config/database"); // connects to database
const mainRoutes = require("./routes/main"); // routes for the homepage, login, signup
const postRoutes = require("./routes/posts"); // routes for posting, feed, etc.

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
