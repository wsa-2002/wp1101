import express from 'express'
import { add_user_score, browse_user_score, delete_db } from '../persistence/user_score.js'
const router = express.Router()

router.post('/api/create-card', async (req, res) => {
  console.log(req.body)
  const ret = await add_user_score(req.body.name, req.body.subject, req.body.score)
  res.json({message: `${ret}(${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true})
})

router.get('/api/query-cards', async (req, res) => {
  const type = req.query.type
  const filter = req.query.queryString
  const data = await browse_user_score(type, filter)
  let ret = []
  for (let i = 0; i < data.length; i++){
    ret.push(`(${data[i].name}, ${data[i].subject}, ${data[i].score})`)
  }
  res.json({messages: ret, message: 'message'})
})

router.delete('/api/clear-db', async (req, res) => {
  await delete_db()
  res.json({message: 'Database cleared'})
})
export default router
