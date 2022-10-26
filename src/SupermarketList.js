import SupermarketCard from "./SupermarketCard.js"
import React, {useEffect, useState} from "react"

function SupermarketList({supermarkets, showDivergence}){
    
    const [searchResults, setSearchResults] = useState([])    
    const [enteredZip, setEnteredZip] = useState(0)
    const [cards, setCards] = useState(supermarkets)
    
    console.log(supermarkets)
    console.log(cards)
    // useEffect(() => {setCards([1,1,1,1])}, [])

    function handleChange(e){
        setEnteredZip(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        searchByZip(enteredZip)
        filterResults()
    }

    function searchByZip (zip) {
        fetch(`http://localhost:9295/areas/zipcode/${zip}`)
        .then((r) => r.json())
        .then((data) => {setSearchResults(data)});
    }

    function filterResults(){
        setCards(searchResults)
    }   

    console.log(cards)

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="zipcode" placeholder="your zipcode..." onChange={handleChange}/>
            </form>
            {supermarkets.map(s => {
            return (
                <SupermarketCard supermarket={s} />
            )})}
        </div>
    )
}

export default SupermarketList