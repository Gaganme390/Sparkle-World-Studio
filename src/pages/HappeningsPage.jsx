import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { happeningsData, happeningsCategories } from '../data/happenings';
import FinalCTA from '../components/FinalCTA';

export default function HappeningsPage({ onOpenEnquiry, setCurrentRoute }) {
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = selectedCat === 'All' 
    ? happeningsData 
    : happeningsData.filter((h) => h.category === selectedCat);

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <span className="tag-label">CAMPUS CHRONICLES & NEWS</span>
          <h1 className="heading-hero" style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>
            HAPPENINGS AT GOENKA.
          </h1>
          <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
            Stay informed with our latest campus announcements, STEM achievements, cultural conclaves, and educational insights.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {happeningsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`academic-tab-btn ${selectedCat === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {filtered.map((item) => (
              <div 
                key={item.id} 
                style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: 'var(--border-thin)', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)', display: 'flex', flexDirection: 'column' }}
              >
                <img src={item.image} alt={item.title} width="600" height="220" loading="lazy" decoding="async" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: '800', marginBottom: '0.5rem' }}>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.date}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
                    {item.summary}
                  </p>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    Read Article <ArrowRight size={14} />
                  </span>
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
