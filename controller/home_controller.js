const Post = require("../models/posts");
const User = require('../models/user');
module.exports.home = function (req, res) {
  //find the user who created the post and the post show  on home page
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        return err;
      }
      User.find({}, function (err, user) {
        if (err) {
          return err;
        }
        return res.render("home", {
          title: " codeil|home",
          posts: posts,
          all_users:user
        });
      })
      
    });
  // // console.log(req.cookies);
  // return res.render('home', {
  //     title: "Home"
  // });
  //   //finding post and show on home page
  // Post.find({}, function (err, posts) {
  //   if (err) {
  //     console.log("error in finding the post ");
  //     return;
  //   }
  //   return res.render("home", {
  //     title: " codeil|home",
  //     posts: posts,
  //   });
  // });
};
