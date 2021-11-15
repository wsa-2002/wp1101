import express from 'express'
import {getNumber, genNumber, setUserNumber, getUserNumber, guessUserNumber} from '../core/getNumber'
const router = express.Router()

router.get('', (_, res) => {
  res.status(418).send({msg: 'This is not backend'})
})


router.post('/start', (_, res) => {
  genNumber()
  const number = getNumber()
  console.log(number)
  res.json({msg: 'The game has started'})
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = parseInt(req.query.number)
  const computer_guess = guessUserNumber();
  const userNum = getUserNumber();
  var finish = false
  if(computer_guess == userNum){
    console.log('here')
    finish = true
  }
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(406).send({msg: 'Not a legal number.'})
  }
  else if (number === guessed){
    res.status(200).send({msg: {res: 'Equal', finish: finish, guess: computer_guess}})
  }
  else if (number > guessed){
    res.status(200).send({msg: {res: 'Bigger', finish: finish, guess: computer_guess}})
  }
  else if (number < guessed){
    res.status(200).send({msg: {res: 'Smaller', finish: finish, guess: computer_guess}})
  }
})

router.post('/restart', (req, res) => {
  genNumber()
  const number = getNumber()
  console.log(number)
  res.json({msg: 'The game has restarted'})
})

router.get('/setNumber', (req, res) => {
  const num = parseInt(req.query.number)
  if (!num || num < 1 || num > 100){
    res.status(406).send({msg: 'Not a legal number'})
  }
  else{
    setUserNumber(req.query.number)
    res.json({msg: true})
  }
})
export default router;