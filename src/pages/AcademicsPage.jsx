import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { academicWings, academicPillars } from '../data/academics';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';

export default function AcademicsPage({ onOpenEnquiry, setCurrentRoute }) {
  const [selectedWing, setSelectedWing] = useState(academicWings[0]);

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">ACADEMIC EXCELLENCE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}
            text="CBSE CURRICULUM & BEYOND."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
              A rigorous, holistic academic continuum spanning Early Foundational Literacy to Senior Board & Competitive Entrance Preparedness.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pedagogical Pillars */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">OUR PEDAGOGICAL APPROACH</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="Four Pillar Learning Framework"
              delay={0.1}
            />
          </div>

          <ScrollReveal className="editorial-grid" stagger staggerAmount={0.1} variant="fadeUp" delay={0.2}>
            {academicPillars.map((p, idx) => (
              <div key={idx} className="col-12 col-md-3 hover-lift" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--color-warm-white)', border: 'var(--border-thin)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-accent)' }}>{p.number}</span>
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>{p.title}</h3>
                <p className="text-body" style={{ fontSize: '0.92rem' }}>{p.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Wing Breakdown Tabs */}
      <section className="section-padding theme-warm-white" id="wings">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">DEVELOPMENTAL STAGES</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}
            text="Explore Our Four Academic Wings"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {academicWings.map((wing) => (
              <button
                key={wing.id}
                onClick={() => setSelectedWing(wing)}
                className={`academic-tab-btn ${selectedWing.id === wing.id ? 'active' : ''}`}
                style={{ padding: '0.85rem 1.75rem' }}
              >
                {wing.title} ({wing.grades})
              </button>
            ))}
          </ScrollReveal>

          <div className="editorial-grid" style={{ alignItems: 'center', background: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-lg)', border: 'var(--border-thin)', boxShadow: 'var(--shadow-card)' }}>
            <ScrollReveal variant="fadeRight" delay={0.1} className="col-12 col-md-6" key={selectedWing.id}>
              <span className="academics-grade-tag">{selectedWing.grades} • AGES {selectedWing.ageGroup}</span>
              <h3 className="font-display" style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', margin: '0.5rem 0' }}>{selectedWing.title}</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-warm-gray-800)', marginBottom: '1.5rem' }}>{selectedWing.subtitle}</p>
              <p className="text-body" style={{ marginBottom: '1.75rem' }}>{selectedWing.description}</p>
              
              <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>KEY HIGHLIGHTS:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                {selectedWing.keyFeatures.map((f, fIdx) => (
                  <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-accent)' }} /> {f}
                  </li>
                ))}
              </ul>

              <MagneticButton strength={4}>
                <button className="btn-enquire" onClick={onOpenEnquiry}>
                  Enquire for {selectedWing.title} <ArrowRight size={16} />
                </button>
              </MagneticButton>
            </ScrollReveal>

            <div className="col-12 col-md-6">
              <ImageReveal 
                key={selectedWing.id}
                src={selectedWing.image} 
                alt={selectedWing.title} 
                width="800"
                height="420"
                delay={0.1}
                style={{ borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
