import React from 'react';
import { Link } from 'react-router-dom';

// hooks
const Menu = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/report">report</Link></li>
        <li><Link to="/info">info</Link></li>
      </ul>
    </div>
  );
}

export default Menu;
