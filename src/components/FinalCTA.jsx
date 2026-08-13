import React from 'react';
import { ArrowRight, Calendar, Compass } from 'lucide-react';
import AnimatedText from './AnimatedText';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import './FinalCTA.css';

export default function FinalCTA({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  return (
    <section className="final-cta-section" id="visit">
      <div className="final-cta-glow" />
      <div className="container final-cta-container">
        <ScrollReveal variant="fadeUp">
          <span className="badge-editorial final-cta-badge">
            <span className="dot"></span> VISITING THE AYODHYA CAMPUS
          </span>
        </ScrollReveal>

        <AnimatedText 
          as="h2"
          className="final-cta-heading"
          text="COME SEE WHERE<br />THE JOURNEY BEGINS."
          delay={0.1}
        />

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <p className="text-body" style={{ color: 'rgba(255, 255, 255, 0.75)', maxWidth: '620px', marginBottom: '2.5rem' }}>
            Schedule a personalized walkthrough of our classrooms, sports grounds, and innovation labs. Discover why GD Goenka Ayodhya is the ideal foundation for your child.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.3} className="final-cta-btn-group">
          <MagneticButton strength={6}>
            <button className="btn-cta-primary" onClick={onOpenVisit || onOpenEnquiry}>
              <Calendar size={18} /> Book a Campus Visit <ArrowRight size={16} />
            </button>
          </MagneticButton>

          <MagneticButton strength={6}>
            <button 
              className="btn-cta-secondary" 
              onClick={() => { setCurrentRoute('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <Compass size={18} /> Contact Admissions
            </button>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
