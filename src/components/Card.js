import React from "react"
import "../styles/Card.css"
export default function Card({id, img, name, onClick, index}){

  return (
    <div className="card" onClick={onClick} >
      <img src={img} alt={name} />
      <div className="name">{name}</div>
    </div>
  )
} 