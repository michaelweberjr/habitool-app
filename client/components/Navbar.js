import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/componentStyles/Navbar.css';

const Navbar = ({ click, atDashboard }) => {
  return (
    <nav className="navbar">
      {/* Navbar Logo */}
      <Link to="/" className="navbar__logo">
        HabiTool
      </Link>
      {/* Hamburger Menu */}
      {atDashboard && <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>}
    </nav>
  );
};

export default Navbar;
