const express = require("express");
const app = express();

const mongoose = require("mongoose"); //talks to database

const passport = require("passport"); // enable authentication strategies
const session = require("express-session"); // user stay logged in
const MongoStore = require("connect-mongo")(session); //storing our actual session in mongo db keeps you locked in


const methodOverride = require("method-override"); // overrides post methods the browers only does get and post 
const flash = require("express-flash"); // flashes errors
const logger = require("morgan"); // logg 

const connectDB = require("./config/database");

//routes
const mainRoutes = require("./routes/main");
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

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method")); //if _method is in the query parameteres they will be overriden

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
  console.log(`Server is running, you better catch it! , port ${process.env.PORT}`);
});
