import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {type: String, required: true}
})

const MessageSchema = new Schema({
  sender: {type: mongoose.Types.ObjectId, ref: "User"},
  body: {type: String, required: true}
})

const ChatBoxSchema = new Schema({
  name: {type: String, required: true},
  messages: [{type: mongoose.Types.ObjectId, ref: "Message"}]
});

const UserModel = mongoose.model("User", UserSchema, 'User');
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema, 'ChatBox'); 
const MessageModel = mongoose.model("Message", MessageSchema, 'Message');

export {UserModel, ChatBoxModel, MessageModel}

