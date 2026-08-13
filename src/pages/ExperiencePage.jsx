import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { experiencePillars } from '../data/experience';
import FinalCTA from '../components/FinalCTA';

export default function ExperiencePage({ onOpenEnquiry, setCurrentRoute }) {
  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">THE GOENKAN EXPERIENCE</span>
          <h1 className="heading-hero" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            INSPIRED SPACES & BEYOND.
          </h1>
          <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
            A comprehensive overview of our 8 experience pillars: Inspired Spaces, Sports (Grow), Cultural Arts (Express), Goenkan Leadership Academy (GLA), Nurture, Conscientious Living, Safety, and Services.
          </p>
        </div>
      </section>

      {/* 8 Detailed Sections */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {experiencePillars.map((item, idx) => (
              <div 
                key={item.id} 
                id={item.id}
                className="editorial-grid" 
                style={{ 
                  alignItems: 'center',
                  direction: idx % 2 === 1 ? 'rtl' : 'ltr',
                  padding: '2.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: idx % 2 === 1 ? 'var(--color-warm-white)' : '#FFFFFF',
                  border: 'var(--border-thin)'
                }}
              >
                <div className="col-12 col-md-6" style={{ direction: 'ltr' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-accent)', letterSpacing: '0.15em' }}>
                    {item.number} — EXPERIENCE PILLAR
                  </span>
                  <h2 className="heading-section" style={{ marginTop: '0.35rem', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h2>
                  <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-warm-gray-800)', marginBottom: '1.25rem' }}>
                    {item.subtitle}
                  </p>
                  <p className="text-body" style={{ marginBottom: '1.75rem' }}>
                    {item.description}
                  </p>

                  <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>FACILITIES & INITIATIVES:</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--color-primary-dark)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} /> {h}
                      </li>
                    ))}
                  </ul>

                  <button className="btn-enquire" onClick={onOpenEnquiry}>
                    Enquire Facility <ArrowRight size={16} />
                  </button>
                </div>

                <div className="col-12 col-md-6" style={{ direction: 'ltr' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    width="800"
                    height="380"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
