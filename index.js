const { urlencoded } = require("express");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5555;
const User = require("./models/user");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require('connect-mongo')(session);
//sending form data to browser
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

// we have to use layouts section before the router section
app.use(expressLayouts);

//extracts styles and javascript from sub pages and  render it to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up ejs engine to use html file
app.set("view engine", "ejs");
app.set("views", "./views");

//session will always use after setting up view engine
app.use(
  session({
    name: 'codeil',
    //todo this has to be change when we are going to deploy things
    secret:'dipankar',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100),
    },
    store:  new MongoStore({
      mongooseConnection: db,
      autoRemove:'disabled'
    },
      function (err) {
        console.log(err|| "connect to mongoStore ok");
      }
    )
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
// use express route
app.use("/", require("./routes/home"));

app.listen(port, (err) => {
  if (err) {
    console.log(`error in running server: ${err}`);
  }
  console.log(`server is running on port : ${port}`);
});
