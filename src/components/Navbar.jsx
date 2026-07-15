import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <div className="silver-stud"></div>
          Lumina
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Feed
          </Link>
          <Link to="/create" className="btn">
            Write
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
