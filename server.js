//gives us access to express
const express = require("express");
//sets exprees to app var to use in code
const app = express();
//access to mongoose functionality
const mongoose = require("mongoose");
//access to passport functionality to set up authentication
const passport = require("passport");
const session = require("express-session");
//set up so we can store session data in db
const MongoStore = require("connect-mongo")(session);
//so we can use PUT/DELETE in places where the client doesn’t support it
const methodOverride = require("method-override");
//flash messages during login/signup process for validation
const flash = require("express-flash");
//logger routes req to console so we can see what is going on
const logger = require("morgan");
//routes to DB connection and routes
const connectDB = require("./config/database");
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
