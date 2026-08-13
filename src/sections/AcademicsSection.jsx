import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { academicWings } from '../data/academics';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import './AcademicsSection.css';

export default function AcademicsSection({ setCurrentRoute }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentWing = academicWings[activeIdx];

  return (
    <section className="academics-section section-padding" id="academics">
      <div className="container">
        <div>
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">05 — ACADEMICS</span>
          </ScrollReveal>

          <AnimatedText 
            as="h2"
            className="heading-section" 
            style={{ marginTop: '0.5rem' }}
            text="LEARNING THAT GROWS WITH THEM."
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-body" style={{ maxWidth: '640px', marginTop: '0.75rem' }}>
              A continuous pedagogical progression tailored to each developmental stage from early childhood foundational discovery to senior secondary board mastery.
            </p>
          </ScrollReveal>
        </div>

        {/* Tab Selection */}
        <ScrollReveal variant="fadeUp" delay={0.3} className="academics-nav-tabs">
          {academicWings.map((wing, idx) => (
            <button
              key={wing.id}
              className={`academic-tab-btn ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Select ${wing.title}`}
            >
              {wing.title} ({wing.grades})
            </button>
          ))}
        </ScrollReveal>

        {/* Active Wing Card Content */}
        <div className="academics-card-grid">
          <ScrollReveal variant="fadeRight" delay={0.1} className="academics-info-side" key={currentWing.id}>
            <span className="academics-grade-tag">{currentWing.grades} • AGES {currentWing.ageGroup}</span>
            <h3 className="academics-wing-title">{currentWing.title}</h3>
            <p className="academics-wing-sub">{currentWing.subtitle}</p>
            <p className="academics-wing-desc">{currentWing.description}</p>

            <ul className="academics-feature-list">
              {currentWing.keyFeatures.map((feat, fIdx) => (
                <li key={fIdx} className="academics-feature-item">
                  <span className="academics-feature-dot"></span>
                  {feat}
                </li>
              ))}
            </ul>

            <MagneticButton strength={4}>
              <button 
                className="btn-enquire"
                onClick={() => { setCurrentRoute('/academics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ alignSelf: 'flex-start' }}
                aria-label={`Explore ${currentWing.title} Details`}
              >
                Explore {currentWing.title} Details <ArrowRight size={16} />
              </button>
            </MagneticButton>
          </ScrollReveal>

          <div className="academics-img-frame">
            <ImageReveal 
              key={currentWing.id}
              src={currentWing.image} 
              alt={currentWing.title} 
              width="600"
              height="400"
              delay={0.1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
