import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import NavBar from "./NavBar";
import SupermarketList from './SupermarketList.js';
import React, {useState, useEffect} from 'react';
import SupermarketForm from './SupermarketForm';
import {Switch, Route} from "react-router-dom";

function App() {

  const [change, setChange] = useState(true)
  

  return (
    <div>
      <NavBar/>
      <Header/>
      <Switch>
        <Route path="/supermarket">
        <SupermarketForm
          setChange={setChange}
          />
        </Route>
        <Route exact path="/">
          <Home/>
          <SupermarketList 
        change={change}
        setChange={setChange}
      />
        </Route>
        <Route path="*">
          <h1>Access Error: 404 -- Not Found </h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;