// Core Modules
const express = require("express"); // Requiring express
const app = express(); // express() being added to app variable
const mongoose = require("mongoose"); // Requiring Mongoose
const passport = require("passport"); // Requiring Passport
const session = require("express-session"); // Requiring Express Session
const MongoStore = require("connect-mongo")(session); // Requiring Mongostore for Cookies
const methodOverride = require("method-override"); // Requiring Method Override
const flash = require("express-flash"); // Requiring Flash
const logger = require("morgan"); // Requiring Morgan
const connectDB = require("./config/database"); // Requiring Database Config File
const mainRoutes = require("./routes/main"); // Main Routes
const postRoutes = require("./routes/posts"); // Post Routes
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

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Whatever comes in, use JSON

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
  console.log("Server is running, you better catch it!"); // Console Log to Show Server is Running
});
