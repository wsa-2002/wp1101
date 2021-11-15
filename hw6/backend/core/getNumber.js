var number
var userNumber
var left_bound = 1
var right_bound = 100
const getNumber = () => {
  return number
}

const genNumber = () => {
  number = Math.ceil(Math.random() * 100)
}

const setUserNumber = (num) => {
  left_bound = 1
  right_bound = 100
  userNumber = num
}

const getUserNumber = () => {
  return userNumber
}

const guessUserNumber = () => {
  const guess = Math.ceil(Math.random() * 100) % (right_bound - left_bound + 1) + left_bound
  if(guess > userNumber){
    right_bound = guess - 1
  }
  else if (guess < userNumber){
    left_bound = guess + 1
  }
  return guess
}
export {getNumber, genNumber, setUserNumber, getUserNumber, guessUserNumber}