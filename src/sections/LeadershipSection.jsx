import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { leadershipData } from '../data/leadership';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import './LeadershipSection.css';

export default function LeadershipSection({ setCurrentRoute }) {
  return (
    <section className="leadership-section section-padding" id="leadership">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">10 — ACADEMIC GOVERNANCE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="PEOPLE WHO LEAD WITH PURPOSE."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
              Experienced educational visionaries guiding GD Goenka Ayodhya towards global benchmarks of holistic learning.
            </p>
          </ScrollReveal>
        </div>

        <div className="leadership-grid">
          {leadershipData.map((leader, idx) => (
            <ScrollReveal key={idx} variant="fadeUp" delay={0.2 + idx * 0.15} className="leader-card hover-lift">
              <div className="leader-img-box">
                <ImageReveal 
                  src={leader.image} 
                  alt={leader.name} 
                  width="600"
                  height="360"
                />
              </div>
              <div className="leader-content">
                <span className="leader-role">{leader.role} • {leader.title}</span>
                <h3 className="leader-name">{leader.name}</h3>
                <p className="leader-message">
                  <Quote size={18} style={{ color: 'var(--color-accent)', display: 'inline', marginRight: '6px' }} />
                  "{leader.message}"
                </p>
                <p className="text-small" style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                  {leader.bio}
                </p>
                <MagneticButton strength={4}>
                  <button 
                    className="btn-enquire"
                    onClick={() => { setCurrentRoute('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ alignSelf: 'flex-start', padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                    aria-label={`Read full message from ${leader.name}`}
                  >
                    Read Full Desk Message <ArrowRight size={14} />
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
