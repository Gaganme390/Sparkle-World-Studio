import React from 'react';
import { Sparkles } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import './AlumniSection.css';

export default function AlumniSection() {
  return (
    <section className="alumni-section section-padding" id="alumni">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">13 — COMMUNITY & ALUMNI LEGACY</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="THE JOURNEY CONTINUES."
            delay={0.1}
          />
        </div>

        <ScrollReveal variant="scaleIn" delay={0.2} className="alumni-quote-box hover-lift">
          <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.2em', color: 'var(--color-accent)' }}>
            BUILDING THE GOENKAN JOURNEY
          </span>
          <h3 className="alumni-quote-title" style={{ marginTop: '0.75rem' }}>
            "Building the Goenkan journey, one generation at a time."
          </h3>
          <p className="alumni-quote-subtitle">
            Every child who enters our gates carries the Goenkan legacy forward into world-class universities, innovative enterprises, and community leadership.
          </p>
          <div className="badge-editorial" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <Sparkles size={14} style={{ color: 'var(--color-accent)' }} /> GD Goenka Global Network Connection
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
