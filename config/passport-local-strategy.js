const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//authentication using passport js
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding the the user -->passport");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid/UserName Password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

//Deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding the the user -->passport");
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is Authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not sign-in
  return res.redirect("/users/sign-in");
};
   
passport.setAuthenticateUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains current signed in user from session cookie and we are just sending this to the locals
   // for the views
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;
