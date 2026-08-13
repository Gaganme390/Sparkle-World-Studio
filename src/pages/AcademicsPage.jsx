import React, { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle, Cpu, Globe } from 'lucide-react';
import { academicWings, academicPillars } from '../data/academics';
import FinalCTA from '../components/FinalCTA';

export default function AcademicsPage({ onOpenEnquiry, setCurrentRoute }) {
  const [selectedWing, setSelectedWing] = useState(academicWings[0]);

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">ACADEMIC EXCELLENCE</span>
          <h1 className="heading-hero" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            CBSE CURRICULUM & BEYOND.
          </h1>
          <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
            A rigorous, holistic academic continuum spanning Early Foundational Literacy to Senior Board & Competitive Entrance Preparedness.
          </p>
        </div>
      </section>

      {/* Pedagogical Pillars */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="tag-label">OUR PEDAGOGICAL APPROACH</span>
            <h2 className="heading-section" style={{ marginTop: '0.5rem' }}>
              Four Pillar Learning Framework
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {academicPillars.map((p, idx) => (
              <div key={idx} style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--color-warm-white)', border: 'var(--border-thin)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-accent)' }}>{p.number}</span>
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>{p.title}</h3>
                <p className="text-body" style={{ fontSize: '0.92rem' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wing Breakdown Tabs */}
      <section className="section-padding theme-warm-white" id="wings">
        <div className="container">
          <span className="tag-label">DEVELOPMENTAL STAGES</span>
          <h2 className="heading-section" style={{ marginTop: '0.5rem', marginBottom: '2.5rem' }}>
            Explore Our Four Academic Wings
          </h2>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
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
          </div>

          <div className="editorial-grid" style={{ alignItems: 'center', background: '#FFFFFF', padding: '3rem', borderRadius: 'var(--radius-lg)', border: 'var(--border-thin)', boxShadow: 'var(--shadow-card)' }}>
            <div className="col-12 col-md-6">
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

              <button className="btn-enquire" onClick={onOpenEnquiry}>
                Enquire for {selectedWing.title} <ArrowRight size={16} />
              </button>
            </div>

            <div className="col-12 col-md-6">
              <img 
                src={selectedWing.image} 
                alt={selectedWing.title} 
                width="800"
                height="420"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
