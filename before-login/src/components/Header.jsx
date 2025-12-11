import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';  // ← add useNavigate
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();  // ← initialize navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="header-logo">
          <h1>TeleMed</h1>
        </div>

        {/* Hamburger Icon */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/aboutus" className="nav-link">About Us</Link>
          <Link to="/contactus" className="nav-link">Contact Us</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="header-auth">
          <button 
            className="login-btn"
            onClick={() => navigate("/login")}   // ← redirect to login
          >
            Login
          </button>

          <button 
            className="signup-btn"
            onClick={() => navigate("/signup")}  // ← redirect to signup
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
