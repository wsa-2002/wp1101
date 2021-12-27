import uuidv4 from 'uuid/v4.js'
import * as util from './util.js'
const Mutation = {
  async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
    console.log('createChatBox')
    if (!name1 || !name2){
      throw new Error('Missing chatbox name for createChatBox')
    }
    if(!(await util.checkUser(db, name1, "createChatBox"))){
      console.log('user doesn\'t exist for CreateChatBox: ', name1)
      await util.newUser(db, name1);
    }
    if(!(await util.checkUser(db, name2, "createChatBox"))){
      console.log('user doesn\'t exist for CreateChatBox: ', name2)
      await util.newUser(db, name2)
    }
    const chatBoxName = util.makeName(name1, name2)
    let chatBox = await util.checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox) chatBox = await util.newChatBox(db, chatBoxName)
    return chatBox
  },

  async createUser(parent, args, {db, pubsub}, info){
    console.log('Create User')
    util.checkUser(db, args.name, 'create user')
    return util.newUser(db, args.name)
  },

  async createMessage(parent, args, {db, pubsub}, info){
    console.log('create Message')
    const sender = await util.checkUser(db, args.sender_name, 'checkUser')
    const chatBoxName = await util.makeName(args.sender_name, args.getter_name)
    const new_mes = await util.newMessage(db, sender.id, args.body, chatBoxName)
    const res = await util.updateChatBox(db, chatBoxName, new_mes.id)
    const payload = {chatbox: {mutation: 'CREATED', data: new_mes}}
    pubsub.publish(`chatbox ${chatBoxName}`, payload)
    return new_mes
  },
}

export default Mutation;