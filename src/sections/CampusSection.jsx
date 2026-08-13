import React from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import './CampusSection.css';

export default function CampusSection({ setCurrentRoute }) {
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
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=75" 
            alt="G.D. Goenka Ayodhya Main Campus Courtyard Architecture" 
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
            <MagneticButton strength={4}>
              <button 
                className="btn-enquire"
                onClick={() => { setCurrentRoute('/gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ whiteSpace: 'nowrap' }}
                aria-label="Explore Campus Gallery Photos"
              >
                Explore Campus Gallery <ArrowRight size={16} />
              </button>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
