import * as util from './util.js'
const Message = {
  async sender(parent, args, { db }, info){
    return await util.getUser(db, parent.sender)
  }
}

export default Message;