import './App.css';
import React, { useState } from "react";
import {guess, startGame, restart} from './axios'
function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const handleGuess = async () => {
    const response = await guess(number)
    if (response === false){
      setStatus('Error: "' + number + '" is not a valid number (1 - 100)')
    }
    else if (response === 'Equal') setHasWon(true)
    else {
      setStatus(response)
      setNumber('')
    }
  }
  const handleStart = async () => {
    setHasStarted(true)
    await startGame()
  }
  const handleRestart = async () => {
    await restart()
    setHasWon(false)
    setStatus('')
    setNumber('')
  }
  const handleChange = (e) => {
    setNumber(e.target.value)
  }
  const startMenu = (
    <div>
      <button onClick={handleStart}> start game</button>
    </div>
  )
  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input onChange={handleChange}></input>
      <button onClick={handleGuess} disabled={!number}>guess!</button>
      <p>{status}</p>
    </>
  )
  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
  )
  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )
  return (
    <div className="App">
      {hasStarted ? game: startMenu}
    </div>
  );
}

export default App;
