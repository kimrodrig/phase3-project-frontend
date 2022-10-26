import SupermarketCard from "./SupermarketCard.js"
import React, {useEffect, useState} from "react"

function SupermarketList({change, setChange}){
    
    const [enteredZip, setEnteredZip] = useState(0)
    const [supermarkets, setSupermarkets] = useState([])
    const [parameter, setParameter] = useState("")

    useEffect(() => {
        fetch(`http://localhost:9295/supermarkets${parameter}`)
        .then((r) => r.json())
        .then((data) => {
            if (data == null) {setParameter("")}
            else setSupermarkets(data)
        })
    }, [parameter]);

    function handleChange(e){
        setEnteredZip(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setParameter(`/byarea/${enteredZip}`)
    }

    console.log(supermarkets)
    console.log(parameter)

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="zipcode" placeholder="your zipcode..." onChange={handleChange}/>
                <button>Submit</button>
            </form>
            {supermarkets.map(s => {
            return (
                <SupermarketCard supermarket={s} setChange={setChange}/>
            )})}
        </div>
    )
}

export default SupermarketList