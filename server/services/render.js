const axios = require("axios");
const { getAbbrev } = require("../utils/utils");

const url = process.env.URL;
exports.homeRoutes = async (req, res) => {
  const authUser = req.user;
  res.render("index", { authUser, title: "Home" });
};



exports.login = async (req, res) => {
  res.render("login");
};


exports.signup = async (req, res) => {
  res.render("signup");
};

exports.getUsers = async (req, res) => {
  const users = await axios.get(`${url}/api/users`);
  const authUser = req.user;
  res.render("user", {
    users: users.data.users,
    authUser,
    title: "Users",
  });
};

exports.manageFriends = async (req, res) => {
  const authUser = req.user;
  res.render("friends", { authUser, title: "Friends" });
};


exports.groupChat = async (req, res) => {
    const authUser = req.user;
    const chats = await axios.get(`${url}/api/chats/group`);
  res.render("groupchat", { authUser, chats: chats.data.chats, title: "Group chat" });
};

exports.personalchat = async (req, res) => {
  const to = req.query.id;
  const authUser = req.user;
  const user = await axios.get(`${url}/api/users/${to}`);
  const chats = await axios.get(`${url}/api/chats/personal?to=${to}&from=${authUser._doc._id}`);
  res.render("personalchat", { authUser, chats: chats.data.chats, user: user.data.user, title: "Personal chat" });
};

