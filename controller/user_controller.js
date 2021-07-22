const User = require("../models/user");

const { model } = require("mongoose");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      // if(err) {console.log(err);return;}
      if (user) {
        return res.render("user", {
          title: "User",
          user: user,
        });
      } 
    });
  } else return res.redirect("/users/sign-in");
};
module.exports.signUp = function (req, res) {
  return res.render("sign_up_form", {
    title: "sign-up-form",
  });
};
module.exports.signIn = function (req, res) {
  return res.render("sign_in_form", {
    title: "sign-in-form",
  });
};
// get user sign-up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding the user while signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating the user while sign-up", err);
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else return res.redirect("back");
  });
};
// get user sign-in data
module.exports.createSession = function (req, res) {
  // steps for authentication
  // find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("finding error while searching in sign-in", err);
      return;
    }
    // handle user found
    if (user) {
      // handle the password which don't match
      if (user.password != req.body.password)
        return res.redirect("/users/sign-in");
      //create session
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    }
    // handle user not found
    else {
      return res.redirect("back");
    }
  });
};
