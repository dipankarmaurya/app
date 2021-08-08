const Post = require("../models/posts");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating post:", err);
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroyPost = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        res.redirect("back");
      });
    } else {
      res.redirect("back");
    }
  });
};
