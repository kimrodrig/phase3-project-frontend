import './App.css';
import Header from './Header.js';
import About from './About.js';
import SupermarketList from './SupermarketList.js';
import React, {useState, useEffect} from 'react';
import SupermarketForm from './SupermarketForm';

function App() {

  const [supermarkets, setSupermarkets] = useState([])
  const [change, setChange] = useState(true)

  useEffect(() => {
    fetch("http://localhost:9295/supermarkets")
    .then((r) => r.json())
    .then((data) => setSupermarkets(data));
    setChange(!change)
  }, []);

  return (
    <div>
      <Header/>
      <About/>
      <SupermarketList 
        supermarkets={supermarkets} 

      />
      <SupermarketForm
        setChange={setChange}
      />
    </div>
  );
}

export default App;
