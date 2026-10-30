import React, { useState } from 'react';
import { ArrowRight, Compass, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import KineticFlair from '../components/KineticFlair';
import { inspiredSpacesFacilities } from '../data/academics';
import './CampusSection.css';

export default function CampusSection({ onOpenVisit, setCurrentRoute }) {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0);

  const prevSpace = () => {
    setActiveSpaceIdx(prev => (prev === 0 ? inspiredSpacesFacilities.length - 1 : prev - 1));
  };

  const nextSpace = () => {
    setActiveSpaceIdx(prev => (prev === inspiredSpacesFacilities.length - 1 ? 0 : prev + 1));
  };

  const activeSpace = inspiredSpacesFacilities[activeSpaceIdx];

  return (
    <section className="campus-section section-padding" id="campus">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              CAMPUS ARCHITECTURE
              <KineticFlair type="burst" size={15} />
            </span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="A PLACE DESIGNED FOR POSSIBILITY"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '680px', marginTop: '0.75rem' }}>
              Every corner of the Ayodhya campus is purposefully crafted to inspire intellectual inquiry, physical athletics, and community gathering.
            </p>
          </ScrollReveal>
        </div>

        {/* Campus Hero Architectural Banner */}
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

        {/* INSPIRED SPACES (PDF 2 Pages 23-32) Showcase */}
        <div className="inspired-spaces-block" style={{ marginTop: '5rem' }}>
          <div className="inspired-spaces-header">
            <div>
              <span className="tag-label" style={{ color: 'var(--color-accent)' }}>
                INSPIRED SPACES • LAUNCHPAD FOR DISCOVERY
              </span>
              <h3 className="font-display" style={{ fontSize: '2.2rem', color: 'var(--color-primary-dark)', marginTop: '0.35rem' }}>
                State-of-the-Art Facilities
              </h3>
            </div>
            <div className="inspired-spaces-controls">
              <button 
                className="inspired-nav-btn" 
                onClick={prevSpace}
                aria-label="Previous facility"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                className="inspired-nav-btn" 
                onClick={nextSpace}
                aria-label="Next facility"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Quick Filter Tabs */}
          <div className="inspired-spaces-tabs">
            {inspiredSpacesFacilities.map((facility, idx) => (
              <button
                key={facility.id}
                className={`inspired-tab-pill ${idx === activeSpaceIdx ? 'active' : ''}`}
                onClick={() => setActiveSpaceIdx(idx)}
              >
                {facility.title}
              </button>
            ))}
          </div>

          {/* Active Facility Display Card */}
          <div className="inspired-space-showcase-card">
            <div className="inspired-space-content">
              <span className="inspired-space-scope">{activeSpace.scope}</span>
              <h4 className="inspired-space-title">{activeSpace.title}</h4>
              <p className="inspired-space-tagline">“{activeSpace.tagline}”</p>
              <p className="text-body inspired-space-desc">{activeSpace.desc}</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                <MagneticButton strength={4}>
                  <button 
                    className="btn-enquire" 
                    onClick={onOpenVisit}
                  >
                    Experience This Space <ArrowRight size={16} />
                  </button>
                </MagneticButton>
                <MagneticButton strength={4}>
                  <button 
                    className="campus-gallery-btn" 
                    onClick={() => { setCurrentRoute('/inspired-spaces'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    All Campus Spaces <ArrowRight size={14} />
                  </button>
                </MagneticButton>
              </div>
            </div>

            <div className="inspired-space-visual">
              <img 
                src={activeSpace.image} 
                alt={activeSpace.title}
                className="inspired-space-img"
                loading="lazy"
              />
              <span className="inspired-space-caption">{activeSpace.title} • Ayodhya Campus</span>
            </div>
          </div>
        </div>

        {/* 4 Real Campus Highlight Cards */}
        <ScrollReveal variant="fadeUp" delay={0.35} className="campus-zones-grid" style={{ marginTop: '4rem' }}>
          <div className="campus-zone-card hover-lift" onClick={() => { setCurrentRoute('/academics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="campus-zone-img-box">
              <img src="/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg" alt="Digital English Language Laboratory" loading="lazy" />
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
              <img src="/school-media/New Pages/Page 3/DSC00046.JPG" alt="Foundational Early Learning Wing" loading="lazy" />
              <span className="campus-zone-badge">Pre-Primary</span>
            </div>
            <div className="campus-zone-content">
              <h4 className="campus-zone-title">Foundational Junior Wing</h4>
              <p className="campus-zone-desc">Sensory immersion, colorful play stations, and joy-filled experiential early childhood learning.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
