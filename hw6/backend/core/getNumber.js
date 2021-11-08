var number

const getNumber = () => {
  return number
}

const genNumber = () => {
  number = Math.ceil(Math.random() * 100)
}

export {getNumber, genNumber}