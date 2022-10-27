import React from "react"
import "../styles/Header.css"

export default function Header({current, best}){
  return(
    <header>
      <h1>PokeCard</h1>
      <div className="stats">
        <h4 className="stat current">
            Current: <span>{current}</span>
        </h4>
        <h4 className="stat best">
          Best: <span>{best>0 ? best : 0}</span>
        </h4>
      </div>
    </header>
  )
}