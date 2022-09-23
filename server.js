const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");

const { isLoggedIn } = require('./middleware/auth');
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");


const PORT = process.env.PORT || 2121
const SESSION_SECRET = process.env.SESSION_SECRET || 'yoursecretsession';

//Use .env file in config folder
require("dotenv").config();

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
    resave: true,
    saveUninitialized: true,
//	  cookie: { maxAge: process.env.COOKIE_DURATION || 60*60*24 }, // 1h
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(isLoggedIn);
app.use(flash());


//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.use('*',(res,req,next) => {
    res.locals.user = req.user;
})

//Server Running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, you better catch it!`);
});
