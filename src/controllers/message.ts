import Message from "../models/message_model";
import NewRequest from "../common/Request";
import NewResponse from "../common/Response";
import NewError from "../common/Error";

const getAllMessage = async (req: NewRequest) => {
  try {
    let messages = {};
    if (req.senderId == null) {
      messages = await Message.find();
    } else {
      messages = await Message.find({ sender: req.senderId });
    }
    return new NewResponse(messages, req.userId, null);
  } catch (err) {
    return new NewResponse(null, req.userId, new NewError(400, err.message));
  }
};

const getMessageById = async (req: NewRequest) => {
  try {
    const messages = await Message.findById(req.postId);
    return new NewResponse(messages, req.userId, null);
  } catch (err) {
    return new NewResponse(null, req.userId, new NewError(400, err.message));
  }
};

const addNewMessage = async (req: NewRequest) => {
  const message = new Message({
    message: req.body.message,
    sender: req.userId,
  });

  try {
    const newMessage = await message.save();
    return new NewResponse(newMessage, req.userId, null);
  } catch (err) {
    return new NewResponse(null, req.userId, new NewError(400, err.message));
  }
};

export = { addNewMessage, getAllMessage, getMessageById };
