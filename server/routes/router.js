const express = require("express");
const route = express.Router();

const services = require("../services/render");
const AuthCtrl = require("../controller/auth.controller");
const UserCtrl = require("../controller/user.controller");
const PostCtrl = require("../controller/post.controller");
const ChatCtrl = require("../controller/chat.controller");

/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/", services.homeRoutes);

/**
 *  @description Login Route
 *  @method GET /
 */
route.get("/auth/login", services.login);


/**
 *  @description Login Route
 *  @method GET /
 */
route.get("/auth/signup", services.signup);

/**
 *  @description user page
 *  @method GET /users
 */
route.get("/users", services.getUsers);

/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/friends", services.manageFriends);

/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/groupchat", services.groupChat);

/**
 *  @description Root Route
 *  @method GET /
 */
route.get("/personalchat", services.personalchat);


//Friend
route.get("/api/users/friends", UserCtrl.getFriends);
route.get("/api/users/friendRequest", UserCtrl.getPendingFriendRequests);
route.put("/api/users/acceptFriend/:id", UserCtrl.acceptFriendRequest);
route.put("/api/users/followFriend", UserCtrl.followFriend);

//User
route.get("/api/users", UserCtrl.fetch);
route.get("/api/users/search", UserCtrl.search);
route.post("/api/users", UserCtrl.create);
route.get("/api/users/:id", UserCtrl.get);
route.put("/api/users/:id", UserCtrl.update);
route.delete("/api/users/:id", UserCtrl.delete);


//Post
route.get("/api/posts", PostCtrl.fetchPosts);
route.post("/api/posts", PostCtrl.createPost);



//Chat
route.get("/api/chats/personal", ChatCtrl.getPersonalChats);
route.post("/api/chats/personal", ChatCtrl.messageFriend);
route.get("/api/chats/group", ChatCtrl.getGroupChats);
route.post("/api/chats/group", ChatCtrl.messageGroupChat);

// Auth
route.post("/auth/login", AuthCtrl.postLogin);
// route.post("/auth/signup", AuthCtrl.postSignup);
route.get("/auth/logout", AuthCtrl.logout);

module.exports = route;
