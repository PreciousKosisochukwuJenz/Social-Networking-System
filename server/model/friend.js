const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    user: {
     type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    friend: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",   
    required: true,
  },
    accepted: {
    type: Boolean,
    default: false,
  },
},{
    timestamps:true
});

const Friend = mongoose.model("Friend", schema);

module.exports = Friend;
