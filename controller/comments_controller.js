const Comment = require("../models/comment");
const { findByIdAndUpdate } = require("../models/posts");
const Post = require("../models/posts");
module.exports.createComment = function (req, res) {
  console.log("hellow", req.body.post);
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("err occured in finding post-->comment controller", err);
      return;
    }
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("err in creating comments");
            return;
          }
          post.comments.push(comment);
          post.save();
          res.redirect("/");
        }
      );
    }
  });
};

module.exports.destroyComment = function (req, res) {
  Comment.findByIdAndDelete(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
