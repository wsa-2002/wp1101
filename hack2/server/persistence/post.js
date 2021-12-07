import Post from '../models/post.js'

const browse = async () => {
  return await Post.find({}).sort({timestamp: -1})
}

const read = async (uuid) => {
  return await Post.findOne({postId: uuid})
}

const add = async (postId, title, content, timestamp) => {
  try{
    const newPost = new Post({postId, title, content, timestamp})
    await newPost.save()
    return true
  }
  catch(e){
    return false
  }
}

const delete_ = async (postId) => {
  try{
    await Post.deleteOne({postId: postId})
    return true
  }
  catch(e){
    return false
  }
}


export {browse, read, add, delete_};