import './App.css';
import React, { useState } from "react";
import {guess, startGame, restart, setNum} from './axios'
function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false)
  const [hasLost, setHasLost] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [myNum, setMynum] = useState('')
  const [hasSet, setHasSet] = useState(false)
  const handleGuess = async () => {
    const response = await guess(number)
    if (!response){
      setStatus('Server not responding, please refresh the page and retry.')
    }
    else if (response.status === 406){
      setStatus('Error: "' + number + '" is not a valid number (1 - 100)')
    }
    else if (response.status){
      setStatus(`HTTP status ${response.status}`)
    }
    else if (response.res === 'Equal') setHasWon(true)
    else if (response.finish === true) setHasLost(true)
    else {
      setStatus(`Your guess should be ${response.res}, Computer Guess: ${response.guess}`)
      setNumber('')
    }
  }
  const setInputNumber = async () => {
    const res = await setNum(myNum)
    if (!res){
      setStatus('Server not responding, please refresh the page and retry.')
    }
    else if (res.status === 406){
      setStatus('Error: "' + myNum + '" is not a valid number (1 - 100)')
    }
    else{
      setHasSet(true)
      setStatus('Your number ' + myNum + ' has been set.')
    }
  }
  const handleStart = async () => {
    setHasStarted(true)
    const res = await startGame()
    if (!res){
      setStatus('Server not responding, please refresh the page and retry.')
    }
  }
  const handleRestart = async () => {
    const res = await restart()
    setHasWon(false)
    setHasLost(false)
    setStatus('')
    setNumber('')
    if (!res){
      setStatus('Server not responding, please refresh the page and retry.')
    }
  }
  const handleChange = (e) => {
    setNumber(e.target.value)
  }
  
  const handleNumChange = (e) => {
    setMynum(e.target.value)
  }
  const startMenu = (
    <div>
      <h1>Guess Number</h1>
      <button onClick={handleStart}> start game</button>
    </div>
  )
  const gameMode = (
    <>
      <h1>Guess Number</h1>
      <p>Set your number between 1 to 100</p>
      <input onChange={handleNumChange}></input>
      <button onClick={setInputNumber} disabled={!myNum}>Set!</button>
      <p>Guess a number between 1 to 100</p>
      <input onChange={handleChange}></input>
      <button onClick={handleGuess} disabled={!number || ! hasSet}>guess!</button>
      <p>{status ? status: `Note: if you want to guess, you should set your number first. If confused, please go watch readme :(`}</p>
    </>
  )
  const winningMode = (
    <>
      <h1>Game Finished!</h1>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
  )
  const losingMode = (
    <>
      <h1>Game Finished!</h1>
      <p>You lose! Computer guess: {myNum}</p>
      <button onClick={handleRestart}>restart</button>
    </>
  )
  const game = (
    <div>
      {hasWon ? winningMode : hasLost ? losingMode : gameMode}
    </div>
  )
  return (
    <div className="App">
      {hasStarted ? game: startMenu}
    </div>
  );
}

export default App;
