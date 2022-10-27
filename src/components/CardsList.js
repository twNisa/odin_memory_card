import React from "react"
import Card from "./Card"
import "../styles/CardsList.css"
export default function CardsList({pokemons, onClick, setIsLoading, amount, defaultAmount}){
  let cardsArray
  let pokemonsArray = Object.values(pokemons)
  const level = (amount-defaultAmount)/2 + 1
  cardsArray = pokemonsArray.map((pokemon, index) => {
    return (
      <Card key={pokemon.id} name={pokemon.name} img={pokemon.img} onClick={(e)=>onClick(e,pokemon.id)} index={index}/>
    )
  })
 
  
  return (
    <div className="cards-container">
      <p>Lvl {level}. Choose a Pokemon card.</p>
      <div className="cards-list">
        {cardsArray}
      </div>
    </div>
  )
}