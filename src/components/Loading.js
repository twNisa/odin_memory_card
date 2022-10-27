import React from "react"
import pokeball from "../assets/pokeball.svg"
import "../styles/Loading.css"
export default function Loading({level}){
  return(
    <div className="loading">
      <img src={pokeball} alt="pokeball"/>
      <p>Loading{level && ` level ${level}`}</p>
    </div>
  )
}