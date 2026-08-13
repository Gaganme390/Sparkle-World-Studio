import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { happeningsData, happeningsCategories } from '../data/happenings';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
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
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">CAMPUS CHRONICLES & NEWS</span>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}
            text="HAPPENINGS AT GOENKA."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
              Stay informed with our latest campus announcements, STEM achievements, cultural conclaves, and educational insights.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <ScrollReveal variant="fadeUp" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {happeningsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`academic-tab-btn ${selectedCat === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </ScrollReveal>

          <ScrollReveal className="editorial-grid" stagger staggerAmount={0.1} variant="fadeUp" delay={0.1} key={selectedCat}>
            {filtered.map((item) => (
              <div 
                key={item.id} 
                className="col-12 col-md-4 hover-lift"
                style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: 'var(--border-thin)', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)', display: 'flex', flexDirection: 'column' }}
              >
                <ImageReveal src={item.image} alt={item.title} width="600" height="220" style={{ height: '220px' }} />
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
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA onOpenEnquiry={onOpenEnquiry} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
