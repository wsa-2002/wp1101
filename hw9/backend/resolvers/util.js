const checkUser = (db, name, errFunc) => {
  if (!name) throw new Error("Missing user name for", errFunc)
  return db.UserModel.findOne({name})
}

const newUser = (db, name) => {
  return new db.UserModel({name}).save()
}

const makeName = (name1, name2) => {
  return [name1.toLowerCase(), name2.toLowerCase()].sort().join('_')
}

const checkChatBox = (db, name, errFunc) => {
  if (!name) throw new Error("Missing user name for", errFunc)
  return db.ChatBoxModel.findOne({name})
}

const newChatBox= (db, name) => {
  return new db.ChatBoxModel({name}).save()
}

const newMessage = (db, sender, body, chatBoxName) => {
  return new db.MessageModel({sender, body}).save()
}

const getUser = (db, user_id) => {
  return db.UserModel.findOne({_id: user_id})
} 

const updateChatBox = (db, chatBoxName, message) => {
  return db.ChatBoxModel.updateOne({name: chatBoxName}, {$push: {messages: message}})
}

export {checkUser, checkChatBox, newUser, makeName, newChatBox, newMessage, getUser, updateChatBox}