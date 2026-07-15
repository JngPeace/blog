import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenSquare, Sparkles, Home } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="glass-nav navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <Sparkles className="logo-icon" size={24} />
          <span className="text-gradient">Lumina</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Feed</span>
          </Link>
          <Link to="/create" className="btn btn-primary">
            <PenSquare size={18} />
            <span>Write</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
