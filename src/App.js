import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import NavBar from "./NavBar";
import SupermarketList from './SupermarketList.js';
import React from 'react';
import SupermarketForm from './SupermarketForm';
import {Switch, Route} from "react-router-dom";

function App() {
  

  return (
    <div>
      <NavBar/>
      <Header/>
      <Switch>
        <Route path="/supermarket">
        <SupermarketForm />
        </Route>
        <Route exact path="/">
          <Home/>
          <SupermarketList />
        </Route>
        <Route path="*">
          <h1>Access Error: 404 -- Not Found </h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;