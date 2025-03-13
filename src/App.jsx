import { useState, useRef, useEffect } from 'react'
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import './App.css'

function App() {
const [dice, setDice] = useState(() => generateAllNewDice())
const buttonRef = useRef(null)

const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

useEffect( () => {
    if (gameWon){
      buttonRef.current.focus()
    } 
}, [gameWon])

function generateAllNewDice(){
  return new Array(10)
      .fill(0)
      .map(()=> ({
        value:Math.ceil(Math.random() * 6), 
        isHeld: false,
        id:nanoid()
      }))
}

function roll(){
  if (!gameWon){
    setDice(oldDice => oldDice.map(die => die.isHeld ? die
      : {...die, value: Math.ceil(Math.random() * 6)} ))
  } else {
    setDice(generateAllNewDice())
  }
  
}

function hold(id){
  setDice(oldDice => oldDice.map(function(die){
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
  }))
}
const diceElements = dice.map(function (diceObj){
  return    <Die  
             key={diceObj.id} 
             value={diceObj.value} 
             isHeld={diceObj.isHeld}
             hold={()=>hold(diceObj.id)}
             />
})
  return (
    <>
      <main>
        {gameWon && <Confetti/>}
        <header>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.
          </p>
        </header>
        <section className='dice-container'>
          {diceElements}
        </section>
        <button ref={buttonRef} onClick={roll} className='roll'>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}

export default App
