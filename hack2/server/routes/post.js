import express from 'express'
import Post from '../models/post'
import { browse, read, add, delete_ } from '../persistence/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (req, res) => {
  const data = await browse()
  if (data.length === 0){
    res.status(403).send({message: "error", data: null})
  }
  else{
  res.json({message: "success", data: data})
  }
})
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
  console.log('postDetail', req.query.pid)
  const data = await read(req.query.pid)
  if (data){
    res.json({message: "success", post: data})
  }
  else{
    res.status(403).send({message: "error", post: null})
  }
})
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
  const result = await add(req.body.postId, req.body.title, req.body.content, req.body.timestamp)
  if(result === true){
    res.json({message: "success"})
  }
  else{
    res.status(403).json({messsage: "error", post: null})
  }
})
// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async (req, res) => {
  const result = await delete_(req.query.pid)
  if(result === true){
    res.json({message: "success"})
  }
  else{
    res.status(403).send({message: "error", post: null})
  }
})
export default router