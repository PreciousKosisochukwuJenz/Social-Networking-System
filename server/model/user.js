const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
    name: {
    type: String,
    required: true,
  },
    image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
   followerCount: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
