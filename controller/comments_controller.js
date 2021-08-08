const Comment = require("../models/comment");
const { findByIdAndUpdate } = require("../models/posts");
const Post = require("../models/posts");
module.exports.createComment =async  function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    
    if (post) {
     let comment= await Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });
        
          post.comments.push(comment);
          post.save();
          res.redirect("/");  
    }
  }
  catch (err) {
    console.log(err);
    return;
  }
};

module.exports.destroyComment = async function (req, res) {
  let comment = await Comment.findByIdAndDelete(req.params.id);
  if (comment.user == req.user.id) {
    let postId = comment.post;
        comment.remove();
      await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: req.params.id } }
    );
    return res.redirect("back");
  } else {
    return res.redirect("back");
  }
};
