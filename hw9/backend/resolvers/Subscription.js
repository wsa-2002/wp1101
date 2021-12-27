const Subscription = {
  chatbox: {
    subscribe(parent, args, {db, pubsub}, info){
      const chatbox = db.ChatBoxModel.find({name: args.name})
      if (!chatbox){
        throw new Error('chat box not found')
      }
      return pubsub.asyncIterator(`chatbox ${args.name}`)
    }
  }
}

export default Subscription