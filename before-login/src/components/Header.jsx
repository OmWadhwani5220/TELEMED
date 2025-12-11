import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1>TeleMed</h1>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to ="/" className="nav-link">
            Home
          </Link>
          <Link to ="/aboutus" className="nav-link">
            About Us
          </Link>
          <Link to ="/contactus" className="nav-link">
            Contact Us
          </Link>
          <Link to ="/faq" className="nav-link">
            FAQ
          </Link>
        </nav>

        <div className="header-auth">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;