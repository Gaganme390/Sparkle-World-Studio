import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { mainNavLinks } from '../data/navigation';
import MagneticButton from './MagneticButton';
import './Navbar.css';

export default function Navbar({ onOpenMenu, onOpenEnquiry, currentRoute, setCurrentRoute }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#') || href.includes('#')) {
      const parts = href.split('#');
      const pageRoute = parts[0] || '/';
      const hashId = parts[1];
      setCurrentRoute(pageRoute);
      if (hashId) {
        setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      setCurrentRoute(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a 
          href="/" 
          className="navbar-logo" 
          onClick={(e) => handleNavClick(e, '/')}
          aria-label="GD Goenka School Ayodhya Homepage"
        >
          <div className="logo-crest">G</div>
          <div className="logo-text-group">
            <span className="logo-title">GD GOENKA</span>
            <span className="logo-subtitle">AYODHYA</span>
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="navbar-links">
            {mainNavLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className={`nav-link-item ${currentRoute === link.href ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <MagneticButton strength={4}>
            <button 
              className="btn-enquire"
              onClick={onOpenEnquiry}
              aria-label="Enquire Admissions"
            >
              Enquire <ArrowRight size={14} />
            </button>
          </MagneticButton>

          <MagneticButton strength={4}>
            <button 
              className="btn-menu-trigger"
              onClick={onOpenMenu}
              aria-label="Open Fullscreen Menu"
            >
              <Menu size={16} />
              <span>MENU</span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}

