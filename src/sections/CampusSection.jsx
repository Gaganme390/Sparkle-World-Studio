import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import './CampusSection.css';

export default function CampusSection({ onOpenVisit, setCurrentRoute }) {
  return (
    <section className="campus-section section-padding" id="campus">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">07 — CAMPUS ARCHITECTURE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="A PLACE DESIGNED FOR POSSIBILITY."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
              Every corner of the Ayodhya campus is purposefully crafted to inspire intellectual inquiry, physical athletics, and community gathering.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fadeUp" delay={0.3} className="campus-hero-banner">
          <ImageReveal 
            src="/school-media/Opening Photos/0/DSC_1334.JPG" 
            alt="G.D. Goenka Public School Ayodhya Main Campus Architecture" 
            width="1000"
            height="500"
            delay={0.2}
          />
          <div className="campus-overlay-card">
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.15em', color: 'var(--color-accent)' }}>
                ENVIRONMENTALLY CONSCIOUS DESIGN
              </span>
              <h3 className="font-display" style={{ fontSize: '1.75rem', color: '#FFFFFF', marginTop: '0.25rem' }}>
                High-Volume Courtyard Ventilation & Sandstone Aesthetic
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <MagneticButton strength={4}>
                <button 
                  className="btn-enquire"
                  onClick={onOpenVisit}
                  style={{ whiteSpace: 'nowrap' }}
                  aria-label="Schedule Campus Walkthrough"
                >
                  <Compass size={16} /> Schedule Campus Walkthrough <ArrowRight size={16} />
                </button>
              </MagneticButton>

              <MagneticButton strength={4}>
                <button 
                  className="campus-gallery-btn"
                  onClick={() => { setCurrentRoute('/gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ whiteSpace: 'nowrap' }}
                  aria-label="Explore Campus Gallery Photos"
                >
                  Explore Gallery
                </button>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Real Campus Highlight Cards */}
        <ScrollReveal variant="fadeUp" delay={0.35} className="campus-zones-grid">
          <div className="campus-zone-card hover-lift" onClick={() => { setCurrentRoute('/academics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="campus-zone-img-box">
              <img src="/school-media/Digital Lab/1.jpeg" alt="Digital English Language Laboratory" loading="lazy" />
              <span className="campus-zone-badge">1st in Ayodhya</span>
            </div>
            <div className="campus-zone-content">
              <h4 className="campus-zone-title">Digital English Language Lab</h4>
              <p className="campus-zone-desc">Cutting-edge multimedia booths, phonetic accent training, and bilingual listening labs.</p>
            </div>
          </div>

          <div className="campus-zone-card hover-lift" onClick={() => { setCurrentRoute('/experience'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="campus-zone-img-box">
              <img src="/school-media/Taekwando/Taekwondo Winners.jpg" alt="Taekwondo & Martial Arts Arena" loading="lazy" />
              <span className="campus-zone-badge">11 District Medals</span>
            </div>
            <div className="campus-zone-content">
              <h4 className="campus-zone-title">Athletics & Martial Arts Arena</h4>
              <p className="campus-zone-desc">Home of our District Championship Taekwondo champions and annual track & field competitions.</p>
            </div>
          </div>

          <div className="campus-zone-card hover-lift" onClick={() => { setCurrentRoute('/gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="campus-zone-img-box">
              <img src="/school-media/Opening Photos/A/DSC_7286.JPG" alt="Courtyards and Corridors" loading="lazy" />
              <span className="campus-zone-badge">Architecture</span>
            </div>
            <div className="campus-zone-content">
              <h4 className="campus-zone-title">Sunlit Courtyards & Corridors</h4>
              <p className="campus-zone-desc">Generous natural illumination, acoustic design, and open air circulation throughout the building.</p>
            </div>
          </div>

          <div className="campus-zone-card hover-lift" onClick={() => { setCurrentRoute('/academics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="campus-zone-img-box">
              <img src="/school-media/Blue Day/IMG_6920.JPG" alt="Foundational Early Learning Wing" loading="lazy" />
              <span className="campus-zone-badge">Pre-Primary</span>
            </div>
            <div className="campus-zone-content">
              <h4 className="campus-zone-title">Foundational Junior Wing</h4>
              <p className="campus-zone-desc">Sensory immersion, Blue & Orange Day discovery, and play-based experiential learning.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
