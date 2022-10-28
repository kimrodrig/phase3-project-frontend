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

    function patchSupermarket(eggsPrice, milkPrice, flourPrice, id) {
        fetch(`http://localhost:9295/supermarkets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price_of_eggs: eggsPrice,
                price_of_milk: milkPrice,
                price_of_flour: flourPrice,
            })
        }).then((r) => r.json())
        .then(() => {
            setRerender(prev => !prev)
            window.location.reload()
            alert("Prices updated successfully!")
        });
    }

    function handleChange(e){
        setEnteredZip(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setParameter(`/byarea/${enteredZip}`)
    }


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
                    <SupermarketCard 
                        supermarket={s} 
                        setRerender={setRerender} 
                        rerender={rerender}
                        patchSupermarket={patchSupermarket}
                    />
                )})}
            </div>
        </div>
    )
}

export default SupermarketList