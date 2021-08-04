const Post = require('../models/posts');

module.exports.home = function (req, res) {
  //find the user who created the post and the post show  on home page
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      if (err) {
        console.log("error in finding the post ");
        return;
      }
      return res.render("home", {
        title: " codeil|home",
        posts: posts,
      });
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
