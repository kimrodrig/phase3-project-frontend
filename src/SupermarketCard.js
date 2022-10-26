import React, {useState, useEffect} from 'react';

function SupermarketCard({supermarket, setChange}){

    const [commodities, setCommodities] = useState([])
    const [divergence, setDivergence] = useState([])
    const [price_index, setPriceIndex] = useState(0)
    const [isHidden, setIsHidden] = useState(true)
    const [eggsPrice, setEggsPrice] = useState(0)
    const [milkPrice, setMilkPrice] = useState(0)
    const [flourPrice, setFlourPrice] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}/commodities`)
        .then((r) => r.json())
        .then((data) => {setCommodities(data)})
    }, [])

    useEffect(() => {
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}/price_index`)
        .then((r) => r.json())
        .then((data) => {setPriceIndex(data)})
    }, [])

    useEffect(()=> {
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}/comparison`)
        .then((r) => r.json())
        .then((data) => {setDivergence(data)});
    }, []);

    function deleteSupermarket(){
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}`, {method: 'DELETE'})
        .then((r) => r.json())
        .then((deletedSupermarket) => {console.log(deletedSupermarket)});
        setChange(prev=>!prev)
    }

    function patchSupermarket(eggsPrice, milkPrice, flourPrice) {
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price_of_eggs: eggsPrice,
                price_of_milk: milkPrice,
                price_of_flour: flourPrice,
            })
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (eggsPrice > 0 && milkPrice > 0 && flourPrice > 0){
            patchSupermarket(eggsPrice, milkPrice, flourPrice);
        }
    }

    return (
        <div>
            <h2> {supermarket.name}, {supermarket.zipcode} </h2>
            <p>Price index: {price_index}</p>
            {commodities.map(c => {
                if (c.name === "eggs"){
                    return (
                        <p>{c.amount} {c.name}: {c.price}</p>
                    )
                }
                else return (
                    <p>{c.amount} of {c.name}: {c.price}</p>
                )
            })}
            {divergence.map(s => {
                return (
                    <p>{s}</p>
                )
            })}
            <button onClick={deleteSupermarket}>Delete</button>
            <button onClick={e=>setIsHidden(prev => !prev)}>Edit Prices</button>
            <div id="priceUpdateForm" style={{display: isHidden ? "none" : "block"}}>
                <form onSubmit={handleSubmit}>
                    <label>
                        One dozen eggs:
                        <input type="text" onChange={(e)=>setEggsPrice(e.target.value)} placeholder="price..."></input>
                    </label>
                    <label>
                        One gallon of milk:
                        <input type="text" onChange={(e)=>setMilkPrice(e.target.value)} placeholder="price..."></input>
                    </label>
                    <label>
                        Five pounds of flour:
                        <input type="text" onChange={(e)=>setFlourPrice(e.target.value)} placeholder="price..."></input>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SupermarketCard;