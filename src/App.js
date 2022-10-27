import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import SupermarketList from './SupermarketList.js';
import React, {useState, useEffect} from 'react';
import SupermarketForm from './SupermarketForm';

function App() {

  const [change, setChange] = useState(true)
  

  return (
    <div>
      <Header/>
      <Home/>
      <SupermarketList 
        change={change}
        setChange={setChange}
      />
      <SupermarketForm
        setChange={setChange}
      />
    </div>
  );
}

export default App;
