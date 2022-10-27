import React, {useState} from 'react';

function SupermarketForm({postSupermarket, setChange}) {
    const [name, setName] = useState("")
    const [zipcode, setZipcode] = useState(0)
    const [eggsPrice, setEggsPrice] = useState(0)
    const [milkPrice, setMilkPrice] = useState(0)
    const [flourPrice, setFlourPrice] = useState(0)

    function handleSubmit(e) {
        e.preventDefault();
        setChange(prev=>!prev)
        postSupermarket(name, zipcode, eggsPrice, milkPrice, flourPrice)
    }

    function postSupermarket (name, zipcode, eggsPrice, milkPrice, flourPrice) {
        fetch(`http://localhost:9295/supermarkets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                zipcode: zipcode,
                price_of_eggs: eggsPrice,
                price_of_milk: milkPrice,
                price_of_flour: flourPrice,
            })
        })
    }

    return (
        <div id="create_form">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Name..."/>
                <input type="text" onChange={(e)=>setZipcode(e.target.value)} placeholder="Zipcode..."/>
                <input type="text" onChange={(e)=>setEggsPrice(e.target.value)} placeholder="Price of a dozen eggs..."/>
                <input type="text" onChange={(e)=>setMilkPrice(e.target.value)} placeholder="Price of a gallon of milk..."/>
                <input type="text" onChange={(e)=>setFlourPrice(e.target.value)} placeholder="Price of 5 pounds of flour..."/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SupermarketForm