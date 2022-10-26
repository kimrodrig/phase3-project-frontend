import React, {useState, useEffect} from 'react';

function SupermarketCard({supermarket}){

    const [commodities, setCommodities] = useState([])
    const [divergence, setDivergence] = useState([])
    const [price_index, setPriceIndex] = useState(0)

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

    return (
        <div>
            <h2> {supermarket.name}, {supermarket.zipcode} </h2>
            <p>Price index: {supermarket.price_index}</p>
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
            
        </div>
    )
}

export default SupermarketCard;