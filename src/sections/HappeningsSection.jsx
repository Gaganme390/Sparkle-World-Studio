import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { happeningsData } from '../data/happenings';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import './HappeningsSection.css';

export default function HappeningsSection({ setCurrentRoute }) {
  const featured = happeningsData.find((h) => h.featured) || happeningsData[0];
  const listItems = happeningsData.filter((h) => h.id !== featured.id).slice(0, 3);

  return (
    <section className="happenings-section section-padding" id="happenings">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">12 — CAMPUS CHRONICLES</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="LIFE AT GOENKA."
              delay={0.1}
            />
          </div>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <MagneticButton strength={4}>
              <button 
                className="btn-enquire"
                onClick={() => { setCurrentRoute('/happenings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ marginTop: '1.5rem' }}
                aria-label="View All News and Events"
              >
                View All News & Events <ArrowRight size={16} />
              </button>
            </MagneticButton>
          </ScrollReveal>
        </div>

        <div className="happenings-featured-grid">
          {/* Featured Major Story */}
          <ScrollReveal variant="fadeRight" delay={0.2} className="hap-featured-card hover-lift">
            <ImageReveal 
              src={featured.image} 
              alt={featured.title} 
              width="800"
              height="340"
            />
            <div className="hap-featured-content">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: '700', marginBottom: '0.75rem' }}>
                <span>{featured.category}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
                  <Calendar size={14} /> {featured.date}
                </span>
              </div>
              <h3 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                {featured.title}
              </h3>
              <p className="text-body" style={{ marginBottom: '1.5rem' }}>
                {featured.summary}
              </p>
              <MagneticButton strength={4}>
                <button 
                  className="btn-enquire"
                  onClick={() => { setCurrentRoute('/happenings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ alignSelf: 'flex-start', padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                  aria-label={`Read full feature: ${featured.title}`}
                >
                  Read Full Feature <ArrowRight size={14} />
                </button>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Secondary Story List */}
          <ScrollReveal className="hap-side-list" stagger staggerAmount={0.12} variant="fadeLeft" delay={0.3}>
            {listItems.map((item) => (
              <div key={item.id} className="hap-side-item hover-lift">
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: '700', marginBottom: '0.5rem' }}>
                  <span>{item.category}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{item.date}</span>
                </div>
                <h4 className="font-display" style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h4>
                <p className="text-small" style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                  {item.summary}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
