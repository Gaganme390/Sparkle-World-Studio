import React from 'react';
import { contactDetails } from '../data/contact';
import { useSchoolData } from '../hooks/useSchoolData';
import ScrollReveal from './ScrollReveal';
import './Footer.css';

export default function Footer({ setCurrentRoute, onOpenEnquiry }) {
  const { schoolInfo } = useSchoolData();
  const info = schoolInfo || {};

  const campusAddress = info.address || contactDetails.campusAddress;
  const phoneNumber = info.primaryPhone || (info.phones && info.phones[0]) || contactDetails.phoneNumbers[0];
  const emailAddress = info.admissionsEmail || (info.emails && info.emails.admissions) || contactDetails.emails.admissions;
  const socialLinks = (info.socialLinks && info.socialLinks.length > 0) ? info.socialLinks : contactDetails.socialLinks;
  const brandDesc = info.description || "Where heritage inspires the future. A premium, modern learning environment fostering curiosity, character, creativity, and global leadership in Ayodhya.";
  const copyrightText = info.copyright || `© ${new Date().getFullYear()} G.D. Goenka Public School, Ayodhya. All Rights Reserved.`;

  const handleNav = (e, href) => {
    e.preventDefault();
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
    <footer className="footer-wrapper">
      <div className="container">
        <ScrollReveal className="footer-top-grid" stagger staggerAmount={0.1} variant="fadeUp">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <img 
                src="/branding/gd_goenka_logo_light.png" 
                alt="G.D. Goenka School Ayodhya Logo" 
                className="footer-brand-logo"
                height="48"
              />
            </div>
            <p className="footer-brand-desc">
              {brandDesc}
            </p>
            <div className="footer-social-links">
              {socialLinks.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="social-pill hover-lift">
                  {item.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-heading">NAVIGATION</h4>
            <ul className="footer-link-list">
              <li><a href="/about" onClick={(e) => handleNav(e, '/about')} className="animated-underline">About Our Campus</a></li>
              <li><a href="/academics" onClick={(e) => handleNav(e, '/academics')} className="animated-underline">Academic Wings</a></li>
              <li><a href="/experience" onClick={(e) => handleNav(e, '/experience')} className="animated-underline">Experience Goenka</a></li>
              <li><a href="/admissions" onClick={(e) => handleNav(e, '/admissions')} className="animated-underline">Admissions 2026-27</a></li>
              <li><a href="/happenings" onClick={(e) => handleNav(e, '/happenings')} className="animated-underline">School Happenings</a></li>
              <li><a href="/gallery" onClick={(e) => handleNav(e, '/gallery')} className="animated-underline">Campus Gallery</a></li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h4 className="footer-heading">USEFUL LINKS</h4>
            <ul className="footer-link-list">
              <li><a href="/admissions#process" onClick={(e) => handleNav(e, '/admissions#process')} className="animated-underline">Admission Process</a></li>
              <li><a href="/admissions#eligibility" onClick={(e) => handleNav(e, '/admissions#eligibility')} className="animated-underline">Eligibility & Criteria</a></li>
              <li><a href="/careers" onClick={(e) => handleNav(e, '/careers')} className="animated-underline">Careers / Work With Us</a></li>
              <li><a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="animated-underline">Campus Location</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenEnquiry(); }} className="animated-underline">Parent Enquiry Form</a></li>
            </ul>
          </div>

          {/* Campus Address Column */}
          <div>
            <h4 className="footer-heading">CAMPUS LOCATION</h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {campusAddress}
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '0.25rem' }}>
              Phone: {phoneNumber}
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>
              Email: {emailAddress}
            </p>
          </div>
        </ScrollReveal>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>{copyrightText}</p>
          <div className="footer-legal-links">
            <a href="/mandatory-disclosure" onClick={(e) => handleNav(e, '/mandatory-disclosure')} className="animated-underline">Mandatory Disclosure</a>
            <a href="/privacy-policy" onClick={(e) => handleNav(e, '/privacy-policy')} className="animated-underline">Privacy Policy</a>
            <a href="/terms-and-conditions" onClick={(e) => handleNav(e, '/terms-and-conditions')} className="animated-underline">Terms & Conditions</a>
            <a href="/admin" onClick={(e) => handleNav(e, '/admin')} className="animated-underline" style={{ color: 'var(--color-accent)' }}>Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
