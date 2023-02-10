const User = require("../model/user");
const { getAbbrev } = require("../utils/utils");
const Friend = require("../model/friend");
const bcrypt = require("bcrypt");

exports.fetch = async (req, res) => {
  let users = await User.find({ _id: { $ne: req.user._doc._id }});
  users = users.map((user) => {
    return { ...user._doc };
  });
  res.status(200).send({ message: "Request successfully", users });
};

exports.search = async (req, res) => {
  const q = req.query.q;
  let users = await User.find({ _id: { $ne: req.user._id }, username:{ $regex: q, $options: 'i'} });
  users = users.map((user) => {
    return { ...user._doc };
  });
  res.status(200).send({ message: "Request successfully", users });
};


exports.create = async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const name = req.body.name;
  const image = getAbbrev(name);
  const password = req.body.password;
  const passwordSalt = req.body.passwordSalt;

  if (password !== passwordSalt)
    res.status(500).send({ message: "Password does not match" });
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);
  const newUser = new User({
    email,
    username,
    name,
    image,
    password: hash,
  });
  await newUser.save();
  res.status(201).send({
    message: `User "${username}" added successfully`,
    user: newUser,
  });
};

exports.get = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select(["username", "email", "role"])
    .populate("role");
  if (!user) console.error("No user found");
  res.status(200).send({ message: "Request successfully", user });
};

exports.update = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const name = req.body.name;
  const id = req.params.id;

  let query = { _id: id };

  let model = {
    username,
    email,
    name,
  };
  const user = await User.updateOne(query, model);
  res
    .status(200)
    .send({ message: `User "${username}" updated successfully`, user });
};

exports.delete = async (req, res) => {
  let query = { _id: req.params.id };
  const user = await User.remove(query);
  res.status(200).send({
    message: `User with id "${req.params.id}" deleted successfully`,
    user,
  });
};


exports.followFriend = async (req, res) => {
  const friend = req.query.friend;
  const user = req.user._id;

  const newFriendship = new Friend({user, friend});
  await newFriendship.save();
  res.status(200).send({
    message: `Friend Request sent`,
  });
};

exports.getPendingFriendRequests = async (req, res) => {
  const query = {friend: req.user._doc._id, accepted: false};
  const friendRequests = await Friend.find(query).sort({createdAt: -1}).populate("user friend");
 
  res.status(200).send({
    message: `Request successful`,
    friendRequests
  });
};

exports.getFriends = async (req, res) => {
  const userId = req.user._doc._id;
  const followerfriends = await Friend.find({
   accepted: true,
   friend: userId
  }).sort({createdAt: -1}).populate("user friend");
  
  const followingfriends = await Friend.find({
   accepted: true,
   user: userId
  }).sort({createdAt: -1}).populate("user friend");

  let friends = [];
  followerfriends.map((i)=> {
    const _friend = {...i._doc.user};
    friends.push(_friend._doc);
  });
  followingfriends.map((i)=> {
    const _friend = {...i._doc.friend};
    friends.push(_friend._doc);
  })
  res.status(200).send({
    message: `Request successful`,
    friends
  });
};

exports.acceptFriendRequest = async (req, res) => {
  const query = {_id: req.params.id};
  const updatedRequest = await Friend.findByIdAndUpdate(query, {$set: {accepted: true}},{new:true});
  await User.findByIdAndUpdate(updatedRequest._doc.user, {$inc: {followerCount: 1}})
  await User.findByIdAndUpdate(updatedRequest._doc.friend, {$inc: {followerCount: 1}})
  res.status(200).send({
    message: `Request Accepted successful`,
    updatedRequest
  });
}