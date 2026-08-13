import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { admissionSteps } from '../data/admissions';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import './AdmissionsSection.css';

export default function AdmissionsSection({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  return (
    <section className="admissions-section section-padding" id="admissions">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', mdDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">14 — ADMISSIONS 2026-27</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="YOUR CHILD'S JOURNEY STARTS HERE."
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-body" style={{ maxWidth: '600px', marginTop: '0.75rem' }}>
                A seamless, transparent 5-step admission pathway designed to introduce your family to the Goenkan educational culture.
              </p>
            </ScrollReveal>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <ScrollReveal variant="fadeUp" delay={0.25}>
              <MagneticButton strength={6}>
                <button 
                  className="btn-enquire"
                  onClick={onOpenEnquiry}
                  style={{ padding: '0.9rem 1.85rem' }}
                >
                  Start Admission Process <ArrowRight size={18} />
                </button>
              </MagneticButton>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.3}>
              <MagneticButton strength={6}>
                <button 
                  className="btn-menu-trigger"
                  onClick={onOpenVisit}
                  style={{ padding: '0.9rem 1.85rem' }}
                >
                  <Compass size={16} /> Book Campus Visit
                </button>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>

        {/* 5 Steps Grid */}
        <ScrollReveal className="admissions-steps-grid" stagger staggerAmount={0.1} variant="fadeUp" delay={0.3}>
          {admissionSteps.map((step) => (
            <div 
              key={step.step} 
              className="step-card hover-lift"
              style={{ cursor: 'pointer' }}
              onClick={() => (step.step === '02' || step.step === '04' ? onOpenVisit() : onOpenEnquiry())}
            >
              <span className="step-num">{step.step}</span>
              <h3 className="step-title">{step.title}</h3>
              <span className="step-sub">{step.subtitle}</span>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
