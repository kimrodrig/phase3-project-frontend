import SupermarketCard from "./SupermarketCard.js"
import React, {useEffect, useState} from "react"

function SupermarketList(){
    
    const [enteredZip, setEnteredZip] = useState(0)
    const [supermarkets, setSupermarkets] = useState([])
    const [parameter, setParameter] = useState("")
    const [rerender, setRerender] = useState(true)

    console.log(rerender)

    useEffect(() => {
        fetch(`http://localhost:9295/supermarkets${parameter}`)
        .then((r) => r.json())
        .then((data) => {
            if (data == null) {
                alert("That zipcode is not in our database. Please enter another.")
                setParameter("")
            }
            else setSupermarkets(data)
        })
    }, [parameter, rerender])

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
            <div id="zipsearch">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="zipcode" placeholder="your zipcode..." onChange={handleChange}/>
                    <button>Search</button>
                </form>
            </div>
            <div class="cards">
                {supermarkets.map(s => {
                return (
                    <SupermarketCard supermarket={s} setRerender={setRerender} rerender={rerender}/>
                )})}
            </div>
        </div>
    )
}

export default SupermarketList