import axios from 'axios'
const instance = axios.create({baseURL: 'http://localhost:4000'})

const startGame = async () => {
  try {
    const {data: {msg}} = await instance.post('/start')
    return msg
  }
  catch (error) {
    console.log(error)
    return error.response
  }
}

const guess = async (number) => {
  try {
    const {data: {msg}} = await instance.get(`/guess`, {params: {number}})
    return msg
  }
  catch (error) {
    console.log(error.response)
    return error.response
  }
}

const restart = async () => {
  try{
    const {data: {msg}} = await instance.post('/restart')
    return msg
  }
  catch (error){
    console.log(error.response)
    return error.response
  }
}

const setNum = async(number) => {
  try{
    const {data: {msg}} = await instance.get('/setNumber', {params: {number}})
    return msg
  }
  catch (error){
    console.log(error.response)
    return error.response
  }
}

export {startGame, guess, restart, setNum}