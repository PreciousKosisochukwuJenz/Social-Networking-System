const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    from: {
     type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",   
    required: true,
  },
    message: {
    type: String,
    required: false,
  },
},{
    timestamps:true
});

const Chat = mongoose.model("Chat", schema);

module.exports = Chat;
