// required modules

// express for back-end management
const express = require("express");
const app = express();
// mongoose for interaction with mongodb
const mongoose = require("mongoose");
// passport for authentification
const passport = require("passport");
// session management and store it in DB
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// make PUT/DELETE methods available in HTML forms
const methodOverride = require("method-override");
// flash messages
const flash = require("express-flash");
// request logger
const logger = require("morgan");
// info to connect to DB
const connectDB = require("./config/database");

// routing files
const mainRoutes = require("./routes/main");
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
