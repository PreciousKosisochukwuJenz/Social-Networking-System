const User = require("../model/user");
const Post = require("../model/post");
const { getAbbrev } = require("../utils/utils");

exports.fetchPosts = async (req, res) => {
  let posts = await Post.find({}).sort({createdAt: -1}).populate("user");
  posts = posts.map((post) => {
    let _post = {...post._doc};
    const image = getAbbrev(_post.user.name);
    _post.user.image = image;
    return _post;
  });
  res.status(200).send({ message: "Request successfully", posts });
};

exports.createPost = async (req, res) => {
  const user = req.body.user;
  const body = req.body.body;
  const newPost = new Post({
    user,
    body,
  });
  await newPost.save();
  res.status(201).send({
    message: `Post created successfully`,
    post: newPost,
  });
};
