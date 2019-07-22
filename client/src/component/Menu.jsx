import React from 'react';
import { Link } from 'react-router-dom';

import '../static/style/component/menu.css';

const Menu = () => {
  return (
    <div className="navbar-menu">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/report">report</Link></li>
      </ul>
    </div>
  );
}

export default Menu;