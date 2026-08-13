import React from 'react';
import { ArrowRight } from 'lucide-react';
import { experiencePillars } from '../data/experience';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import './ExperienceSection.css';

export default function ExperienceSection({ setCurrentRoute }) {
  return (
    <section className="experience-section section-padding" id="experience">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', mdDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">06 — EXPERIENCE GOENKA</span>
            </ScrollReveal>
            
            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="EDUCATION DOESN'T END<br />AT THE CLASSROOM."
              delay={0.1}
            />
          </div>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <MagneticButton strength={4}>
              <button 
                className="btn-enquire" 
                onClick={() => { setCurrentRoute('/experience'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ marginTop: '1.5rem' }}
                aria-label="Explore All 8 Pillars of Goenka Experience"
              >
                Explore All 8 Pillars <ArrowRight size={16} />
              </button>
            </MagneticButton>
          </ScrollReveal>
        </div>

        <ScrollReveal className="experience-grid" stagger staggerAmount={0.1} variant="fadeUp" delay={0.3}>
          {experiencePillars.map((item) => (
            <div key={item.id} className="exp-pillar-card hover-lift">
              <div className="exp-img-wrap">
                <ImageReveal 
                  src={item.image} 
                  alt={item.title} 
                  width="400"
                  height="200"
                />
              </div>
              <div className="exp-body">
                <span className="exp-num">{item.number}</span>
                <h3 className="exp-title">{item.title}</h3>
                <p className="exp-desc">{item.subtitle}</p>
                <a 
                  href={`/experience#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentRoute('/experience');
                    setTimeout(() => {
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  aria-label={`Learn more about ${item.title}`}
                >
                  Learn More <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
