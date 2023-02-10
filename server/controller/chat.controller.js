const Chat = require("../model/chat");
const GroupChat = require("../model/groupChat");


exports.messageFriend = async (req, res) => {
  const to = req.body.to;
  const message = req.body.message;
  const from = req.user._id;

  const chat = new Chat({from,to,message});
  await chat.save();
  res.status(200).send({
    message: `Saved chat`,
  });
};

exports.messageGroupChat = async (req, res) => {
  const message = req.body.message;
  const from = req.user._id;

  const chat = new GroupChat({from,message});
  await chat.save();
  res.status(200).send({
    message: `Saved chat`,
  });
};

exports.getPersonalChats = async (req, res) => {
  const from = req.user._id;
  const to = req.query.to;

  const chats = await Chat.find({ $or:[{to}, {from}]}).sort({createdAt: -1}).populate("to from");
  res.status(200).send({
    message: `Request successful`,
    chats
  });
};

exports.getGroupChats = async (req, res) => {
  const chats = await GroupChat.find({}).sort({createdAt: -1}).populate("from");
  res.status(200).send({
    message: `Request successful`,
    chats
  });
};
