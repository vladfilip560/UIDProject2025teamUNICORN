import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* We use Link instead of <a href> to prevent page refresh */}
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/Acomodation" className="nav-link">Acomodation</Link>
      <Link to="/Activities" className="nav-link">Activities</Link>
      <Link to="/Transport" className="nav-link">Transport</Link>
      <Link to="/BarsTinder" className="nav-link">Places to Visit</Link>
    </nav>
  );
};

export default Navbar;