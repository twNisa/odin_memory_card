import React, { memo } from "react"
import './App.css';
import Card from "./components/Card"
import CardsList from "./components/CardsList"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import GameOver from "./components/GameOver";
const DEFAULT_AMOUNT = 5
const POKEMON_MAX = 898

function getIdsArray(amount, max){
  let ids =[]
  for(let i =0; i< amount; i++){
    let rand = Math.floor(Math.random() * max)
    while (ids.includes(rand)){
      rand = Math.floor(Math.random() * max)
    }
    ids.push(rand)
  }
  return ids
}

function App() {


  const Pokedex = require("pokeapi-js-wrapper")
  const P = new Pokedex.Pokedex()
  const [amount, setAmount] = React.useState(DEFAULT_AMOUNT)
  const [pokemons, setPokemons] = React.useState([])
  const [memory, setMemory] = React.useState([])

  const [best, setBest] = React.useState(localStorage.getItem("best"))
  const [current, setCurrent] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoss, setIsLoss] = React.useState(false)
  const [isWin, setIsWin] = React.useState(false)
  React.useEffect(()=>{
    console.log("amount effect")
   
    getPokemons(amount)
  }, [amount])
  
  React.useEffect(()=>{
    localStorage.setItem("best", best)
  },[best])

  async function getPokemons(amount){
    setIsLoading(true)
      let idsArray = getIdsArray(amount, POKEMON_MAX)
      await Promise.all(
        idsArray.map(async id =>{
          const data = await P.getPokemonByName(id)
  
          return ({id: data.id, name: data.species.name, img: data.sprites.other["official-artwork"].front_default})
        })
      ).then(value => setPokemons(value))
    setIsLoading(false)
  }

  React.useEffect(()=>{
    console.log("memory effect")
    if(memory.length === pokemons.length && memory.length > 0) {
      handleWin()
    }
  },[memory])
  function handleClick(e, id){
    if(!memory.includes(id)){
      console.log("clicked")
      setMemory([...memory, id])
     
      const shuffledArray = shuffleArray(JSON.parse(JSON.stringify(pokemons)))
      setPokemons(shuffledArray)
      setCurrent(prev=> prev+1)
    } else{
      handleLoss(id)
    } 
  }

  function evaluateBest(){
    current > best  && setBest(current)
  }

  function handleWin(){
    console.log("win game")
    evaluateBest()
    setIsWin(true)
  }
 
  function handleLoss(){
    console.log("LOST")
    evaluateBest()
    setIsLoss(true)
    
  }
  function newGame(){
    console.log("new game")
    setCurrent(0)
    setAmount(DEFAULT_AMOUNT)
    setMemory([])
    getPokemons(DEFAULT_AMOUNT)
    setIsLoss(false)
    setIsWin(false)
  }
  function nextRound(){
    console.log("next round")
    setMemory([])
    setAmount(prev => prev+2)
    setIsLoss(false)
    setIsWin(false)
  }
  function shuffleArray(array) {
  
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  function getLoss(){
    console.log("get loss")
    return <GameOver status="lose" current={current} best={best} onClick={newGame} />
  }
  function getWin(){
    return <GameOver status="win" current={current} best={best} onClick={nextRound} quit={newGame} />
  }
  function getLoading(){
    console.log("loading")
    return <Loading />
  }
  function getMemoryCardGame(){
    return (
      <div className="game">
        <Header current={current} best={best}/>
        <CardsList pokemons={pokemons} onClick={handleClick} setIsLoading={setIsLoading} amount={amount} defaultAmount={DEFAULT_AMOUNT}/>
        <Footer />
      </div>
    )
  }

  function getCurrent(){
    {if(isLoss){
      return getLoss()
    } else if(isWin){
      return getWin()
    } else if(isLoading){
      console.log("loading")
      return getLoading()
    } else{
      return getMemoryCardGame()
    }}
  }
  return (
    <div className="App">
      {getCurrent()}
      
    
    </div>
  );
}

export default App;
