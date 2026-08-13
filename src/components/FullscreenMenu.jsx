import React, { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fullscreenMenuStructure } from '../data/navigation';
import { contactDetails } from '../data/contact';
import MagneticButton from './MagneticButton';
import './FullscreenMenu.css';

export default function FullscreenMenu({ isOpen, onClose, setCurrentRoute, onOpenEnquiry }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    onClose();
    if (href.includes('#')) {
      const parts = href.split('#');
      const pageRoute = parts[0] || '/';
      const hashId = parts[1];
      setCurrentRoute(pageRoute);
      if (hashId) {
        setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      setCurrentRoute(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="menu-overlay"
          initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Menu Header */}
          <div className="container menu-overlay-header">
            <a href="/" className="navbar-logo" onClick={(e) => handleLinkClick(e, '/')}>
              <div className="logo-crest">G</div>
              <div className="logo-text-group">
                <span className="logo-title" style={{ color: '#FFFFFF' }}>GD GOENKA</span>
                <span className="logo-subtitle">AYODHYA</span>
              </div>
            </a>

            <button 
              className="btn-close-menu" 
              onClick={onClose}
              aria-label="Close Menu"
            >
              <span>CLOSE</span>
              <X size={18} />
            </button>
          </div>

          {/* Menu Grid */}
          <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="menu-grid-container">
              {fullscreenMenuStructure.map((col, idx) => (
                <motion.div 
                  key={idx} 
                  className="menu-column"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.06 }}
                >
                  <span className="menu-category-title">{col.category}</span>
                  <ul className="menu-link-list">
                    {col.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="menu-link-item">
                        <a 
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className="animated-underline"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Menu Footer */}
            <motion.div 
              className="menu-footer-bar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className="menu-contact-info">
                <p className="menu-contact-address">{contactDetails.campusAddress}</p>
                <p className="menu-contact-phone">{contactDetails.phoneNumbers[0]}</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <MagneticButton strength={4}>
                  <button 
                    className="btn-enquire"
                    onClick={() => { onClose(); onOpenEnquiry(); }}
                  >
                    Apply / Enquire Now <ArrowRight size={16} />
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

