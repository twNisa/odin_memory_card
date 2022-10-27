import React from "react"
import "../styles/GameOver.css"
export default function GameOver({status, current, best, onClick, quit}){
  function getButtons(){
    if(status === "win"){
      
      return (
        <div className="btns">
          <button className="btn next round" onClick={()=>onClick()}>Next Round</button> 
          <button className="btn quit" onClick={()=>quit()}>Quit</button> 
        </div>
      )
    } else{
      return (
        <div className="btns">
         <button className="btn new-game" onClick={()=>onClick()}>New Game</button>
        </div>
      )
    }
  }
  return(
    <div className={`gameover ${status}lose-game`}>
      <h4>{status === "win" ? "Round won! " : "Game over!"}  </h4>
      <p>Your score is {current}, your best score is {best}. </p>
      {getButtons()}
  
      
    </div>
  )
}