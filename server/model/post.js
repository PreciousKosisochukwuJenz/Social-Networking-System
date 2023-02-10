const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    user: {
   type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});

const Post = mongoose.model("Post", schema);

module.exports = Post;
