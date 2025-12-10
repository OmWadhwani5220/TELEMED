import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
       
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-section-title">TeleMed</h3>
          <ul className="footer-links">
            
            <li><a href="/about">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>

          </ul>
        </div>
 

        {/* Social Media */}
        <div className="footer-section">
          <h3 className="footer-section-title">Follow Us</h3>
          <div className="social-links">
            <a href="#" className="social-icon" title="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon" title="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="social-icon" title="YouTube">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="footer-contact">
        <div className="contact-item">
          <Phone size={18} />
          <span>1-800-TELEMED</span>
        </div>
        <div className="contact-item">
          <Mail size={18} />
          <span>support@telemed.com</span>
        </div>
        <div className="contact-item">
          <MapPin size={18} />
          <span>Headquarters, Mumbai, India</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-logo">
          <h2>TeleMed</h2>
        </div>
        <p className="copyright">
          Copyright © {new Date().getFullYear()} TeleMed. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;