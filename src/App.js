import './App.css';
import Header from './Header.js';
import About from './About.js';
import SupermarketList from './SupermarketList.js';
import React, {useState, useEffect} from 'react';
import SupermarketForm from './SupermarketForm';

function App() {

  const [supermarkets, setSupermarkets] = useState([])

  useEffect(() => {
    fetch("http://localhost:9295/supermarkets")
    .then((r) => r.json())
    .then((data) => setSupermarkets(data));;
  }, []);

  function displayCommodities (id) {
    fetch(`http://localhost:9295/supermarkets/${id}/commodities`)
    .then((r) => r.json())
    .then((data) => {return (data)});
  }
  
  function postSupermarket (name, zipcode, eggPrice, milkPrice, flourPrice) {
    fetch(`http://localhost:9295/supermarkets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        zipcode: zipcode,
        price_of_eggs: eggPrice,
        price_of_milk: milkPrice,
        price_of_flour: flourPrice,
      })
    })
  }

  function patchSupermarket (id, eggPrice, milkPrice, flourPrice){
    fetch(`http://localhost:9295/supermarkets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_of_eggs: eggPrice,
        price_of_milk: milkPrice,
        price_of_flour: flourPrice,
      })
    })
    .then((r) => r.json())
    .then((updatedCommodities) => console.log(updatedCommodities));
  }

  return (
    <div>
      <Header/>
      <About/>
      <SupermarketList 
        supermarkets={supermarkets} 
        patchSupermarket={patchSupermarket}
      />
      <SupermarketForm postSupermarket={postSupermarket}/>
    </div>
  );
}

export default App;
