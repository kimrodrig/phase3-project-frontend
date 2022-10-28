import React, {useState, useEffect} from 'react';

function SupermarketCard({supermarket, setRerender, patchSupermarket}){

    const [commodities, setCommodities] = useState([])
    const [divergence, setDivergence] = useState([])
    const [isHidden, setIsHidden] = useState(true)
    const [eggsPrice, setEggsPrice] = useState(0)
    const [milkPrice, setMilkPrice] = useState(0)
    const [flourPrice, setFlourPrice] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}/commodities`)
        .then((r) => r.json())
        .then((data) => {setCommodities(data)})
    }, [])

    useEffect(()=> {
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}/comparison`)
        .then((r) => r.json())
        .then((data) => {setDivergence(data)});
    }, []);

    function deleteSupermarket(id){
        fetch(`http://localhost:9295/supermarkets/${supermarket.id}`, {method: 'DELETE'})
        .then((r) => r.json())
        .then(() => {
            setRerender(prev => !prev)
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (eggsPrice > 0 && milkPrice > 0 && flourPrice > 0){
            patchSupermarket(eggsPrice, milkPrice, flourPrice, supermarket.id);
        }
        else {
            alert("Please enter valid prices")
        }
        e.target.reset()
        setIsHidden(true)
        setRerender(prev => !prev)
    }

    return (
        <div class="card">
            <h2> {supermarket.name}, {supermarket.zipcode} </h2>
            {commodities.map(c => {
                if (c.name === "eggs"){
                    return (<p>{c.amount} {c.name}: ${c.price}</p>)
                }
                else return (<p>{c.amount} of {c.name}: ${c.price}</p>)
            })}
            <br></br>
            {divergence.map(s => {
                return (<p>{s}</p>)
            })}
            <br></br>
            <div class="button-div">
                <button onClick={deleteSupermarket}>Delete</button>
                <button onClick={e=>setIsHidden(prev => !prev)}>Edit Prices</button>
            </div>
            <div id="priceUpdateForm" style={{display: isHidden ? "none" : "block"}}>
                <form onSubmit={handleSubmit}>
                    <label>
                        One dozen eggs:
                        <input type="text" onChange={(e)=>setEggsPrice(e.target.value)} placeholder="price in dollars..."></input>
                    </label>
                    <label>
                        One gallon of milk:
                        <input type="text" onChange={(e)=>setMilkPrice(e.target.value)} placeholder="price in dollars..."></input>
                    </label>
                    <label>
                        Five pounds of flour:
                        <input type="text" onChange={(e)=>setFlourPrice(e.target.value)} placeholder="price in dollars..."></input>
                    </label>
                    <button>Update Prices</button>
                </form>
            </div>
        </div>
    )
}

export default SupermarketCard;