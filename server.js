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
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
require('dotenv').config({ path: './config/.env' })

// Passport config
require("./config/passport")(passport);
require('./config/passport')(passport)

//Connect To Database
connectDB();
connectDB()

//Using EJS for views
app.set("view engine", "ejs");
app.set('view engine', 'ejs')

//Static Folder
app.use(express.static("public"));
app.use(express.static('public'))

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"));
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));
app.use(methodOverride('_method'))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash());
app.use(flash())

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use('/', mainRoutes)
app.use('/post', postRoutes)
app.use('/comments', commentRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
	console.log('Server is running, you better catch it!')
})
