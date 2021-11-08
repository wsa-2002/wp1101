import express from 'express'
import {getNumber, genNumber} from '../core/getNumber'
const router = express.Router()
router.get('/start', (_, res) => {
  genNumber()
  const number = getNumber()
  console.log(number)
  res.json({msg: 'The game has started'})
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = parseInt(req.query.number)

  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(406).send({msg: 'Not a legal number.'})
  }
  else if (number === guessed){
    res.status(200).send({msg: 'Equal'})
  }
  else if (number > guessed){
    res.status(200).send({msg: 'Bigger'})
  }
  else if (number < guessed){
    res.status(200).send({msg: 'Smaller'})
  }
})

router.post('/restart', (req, res) => {
  genNumber()
  const number = getNumber()
  console.log(number)
  res.json({msg: 'The game has restarted'})
})
export default router;