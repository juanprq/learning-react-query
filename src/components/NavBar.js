import React from 'react';

const NavBar = ({ onPlanetsClick, onPeopleClick }) => (
  <nav>
    <button onClick={onPlanetsClick}>Planets</button>
    <button onClick={onPeopleClick}>People</button>
  </nav>
);

export default NavBar;
