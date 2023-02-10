const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    from: {
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

const GroupChat = mongoose.model("GroupChat", schema);

module.exports = GroupChat;
