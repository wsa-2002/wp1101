const Query = {

  async chatBoxes(parent, args, { db }, info){
    console.log('get chatboxes')
    if (!args.name)
      return db.ChatBoxModel.find()
    return db.ChatBoxModel.findOne({name: args.name})
  },

  async users(parent, args, { db }, info){
    console.log('query user')
    if(!args.name){
      return db.UserModel.find()
    }
    return db.UserModel.filter((user) => {
      return user.name.toLowerCase().includes(args.name.toLowerCase())
    })
  },

  async messages(parent, args, {db}, info){
    console.log("query messages")
    return db.MessageModel.find()
  }
  
}

export {Query as default}