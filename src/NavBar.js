import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/supermarket">Add SuperMarket</NavLink>
    </nav>
  );
};

export default NavBar;
