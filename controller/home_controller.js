const Post = require("../models/posts");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  //find the user who created the post and the post show  on home page

  try {
    let post = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let user = await User.find({});
    return res.render("home", {
      title: " codeil|home",
      posts: post,
      all_users: user,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
