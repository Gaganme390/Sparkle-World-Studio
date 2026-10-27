import React, { useState } from 'react';
import { ArrowRight, Clock, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { academicWings } from '../data/academics';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './JuniorWingPage.css';

export default function WingDetailPage({ wingId = 'primary', onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const wing = academicWings.find(w => w.id === wingId) || academicWings[1];
  const [activeGradeIdx, setActiveGradeIdx] = useState(0);

  const currentGrade = wing.detailedGrades && wing.detailedGrades[activeGradeIdx] ? wing.detailedGrades[activeGradeIdx] : null;

  return (
    <main className="junior-wing-page" style={{ paddingTop: 'var(--header-height)' }}>
      {/* 1. Wing Hero Header */}
      <section className="jw-hero-section" style={{ minHeight: '380px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
          <span className="jw-hero-tag" style={{ color: 'var(--color-accent)' }}>ACADEMIC EXCELLENCE</span>
          <h1 className="jw-hero-title" style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)' }}>
            {wing.title}
          </h1>
          <p className="jw-hero-subtitle" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {wing.grades} • {wing.subtitle}
          </p>

          <div className="jw-hero-pill-row" style={{ marginTop: '1.25rem' }}>
            <span className="jw-pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}>
              <Clock size={14} /> {wing.timings}
            </span>
            <span className="jw-pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}>
              <Users size={14} /> {wing.ratio}
            </span>
            <span className="jw-pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}>
              <BookOpen size={14} /> Ages {wing.ageGroup}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="jw-overview-section section-padding">
        <div className="container">
          <div className="jw-overview-grid">
            <ScrollReveal variant="fadeRight" delay={0.1} className="jw-overview-text">
              <span className="jw-section-tag">{wing.title} OVERVIEW</span>
              <h2 className="jw-overview-heading">{wing.subtitle}</h2>
              <p className="jw-overview-lead">{wing.description}</p>
              
              <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--color-primary-dark)', margin: '1.75rem 0 0.85rem' }}>
                KEY PILLARS & PROGRESSION:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {wing.keyFeatures.map((feat, fIdx) => (
                  <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-warm-gray-800)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                    {feat}
                  </li>
                ))}
              </ul>

              <MagneticButton strength={3}>
                <button className="btn-enquire" onClick={() => onOpenEnquiry && onOpenEnquiry(wing.title)}>
                  Apply for {wing.title} <ArrowRight size={16} />
                </button>
              </MagneticButton>
            </ScrollReveal>

            <ScrollReveal variant="fadeLeft" delay={0.2} className="jw-overview-media">
              <div className="jw-overview-img-frame">
                <img 
                  src={wing.image} 
                  alt={`${wing.title} at GD Goenka Public School Ayodhya`} 
                  className="jw-overview-img"
                />
                <span className="jw-media-badge">{wing.grades}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Detailed Grade Progression */}
      {wing.detailedGrades && wing.detailedGrades.length > 0 && (
        <section className="jw-academics-section section-padding theme-warm-soft">
          <div className="container">
            <div className="jw-section-header">
              <span className="jw-section-tag">CURRICULAR PROGRESSION</span>
              <h2 className="heading-section">Grade-by-Grade Growth</h2>
              <p className="text-body" style={{ maxWidth: '640px', margin: '0.5rem auto 0' }}>
                Pedagogically sequenced milestones designed for students in {wing.grades}.
              </p>
            </div>

            <div className="jw-tabs-bar">
              {wing.detailedGrades.map((g, idx) => (
                <button
                  key={idx}
                  className={`jw-tab-btn ${activeGradeIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveGradeIdx(idx)}
                >
                  {g.grade}
                </button>
              ))}
            </div>

            {currentGrade && (
              <div className="jw-tab-card" key={currentGrade.grade}>
                <div className="jw-tab-card-grid">
                  <div className="jw-tab-img-col">
                    <img 
                      src={currentGrade.image} 
                      alt={`${currentGrade.grade} at GD Goenka Ayodhya`} 
                      className="jw-tab-img"
                    />
                  </div>
                  <div className="jw-tab-text-col">
                    <span className="jw-tab-stage-badge">{currentGrade.grade} Milestone</span>
                    <h3 className="jw-tab-title">{currentGrade.focus}</h3>
                    <p className="jw-tab-para">{currentGrade.desc}</p>
                    <div className="jw-tab-action">
                      <MagneticButton strength={3}>
                        <button className="btn-enquire" onClick={() => onOpenEnquiry && onOpenEnquiry(currentGrade.grade)}>
                          Enquire for {currentGrade.grade} <ArrowRight size={16} />
                        </button>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Bottom CTA */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
