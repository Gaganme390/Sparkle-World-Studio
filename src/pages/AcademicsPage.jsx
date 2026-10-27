import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Clock, Users, BookOpen, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { academicWings, academicPillars } from '../data/academics';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import ImageReveal from '../components/ImageReveal';
import MagneticButton from '../components/MagneticButton';
import FinalCTA from '../components/FinalCTA';
import './AcademicsPage.css';

const WING_ROUTES = {
  junior: '/junior-wing',
  primary: '/primary-wing',
  middle: '/middle-wing',
  senior: '/senior-wing'
};

const WING_COVER_IMAGES = {
  junior: '/school-media/academics/junior_wing_card.jpg',
  primary: '/school-media/academics/primary_wing_card.jpg',
  middle: '/school-media/academics/middle_wing_card.jpg',
  senior: '/school-media/academics/senior_wing_card.jpg'
};

export default function AcademicsPage({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const [selectedWing, setSelectedWing] = useState(academicWings[0]);

  const handleNavigateToWing = (e, wingId) => {
    e?.preventDefault();
    const route = WING_ROUTES[wingId] || '/junior-wing';
    if (setCurrentRoute) {
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (typeof window !== 'undefined') {
      window.location.href = route;
    }
  };

  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* 1. Header */}
      <section className="section-padding theme-warm-soft">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <span className="tag-label">ACADEMIC EXCELLENCE</span>
          </ScrollReveal>

          <AnimatedText 
            as="h1"
            className="heading-hero" 
            style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}
            text="CBSE CURRICULUM & BEYOND"
            delay={0.1}
          />

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-editorial-lead" style={{ maxWidth: '780px' }}>
              A curriculum calibrated to each stage of growth — spanning Early Foundational Literacy to Senior Board &amp; Competitive Entrance Preparedness.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Pedagogical Pillars */}
      <section className="section-padding theme-pure-white">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">OUR PEDAGOGICAL APPROACH</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem' }}
              text="Four Pillar Learning Framework"
              delay={0.1}
            />
          </div>

          <ScrollReveal variant="fadeUp" delay={0.2} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {academicPillars.map((p, idx) => (
              <div key={idx} className="hover-lift" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', background: 'var(--color-warm-white)', border: 'var(--border-thin)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-accent)' }}>{p.number}</span>
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>{p.title}</h3>
                <p className="text-body" style={{ fontSize: '0.92rem' }}>{p.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Modern Four Academic Wings Showcase */}
      <section className="academics-wings-suite" id="wings">
        <div className="container">
          
          <div className="academics-wings-header">
            <ScrollReveal variant="fadeUp">
              <span className="tag-label">DEVELOPMENTAL STAGES • NURSERY TO GRADE 12</span>
            </ScrollReveal>

            <AnimatedText 
              as="h2"
              className="heading-section" 
              style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}
              text="Explore Our Four Academic Wings"
              delay={0.1}
            />

            <ScrollReveal variant="fadeUp" delay={0.15}>
              <p className="text-body" style={{ maxWidth: '780px', fontSize: '1.05rem', lineHeight: '1.75' }}>
                Each wing is an intentionally structured educational realm with age-appropriate architecture, dedicated faculty, and specialized cognitive pathways. Select any wing below to explore its stage curriculum.
              </p>
            </ScrollReveal>
          </div>

          {/* 4 Cards Grid Showcase (All 4 Wings Visible Simultaneously) */}
          <div className="academics-wings-cards-grid">
            {academicWings.map((wing, idx) => {
              const isSelected = selectedWing.id === wing.id;
              const coverImg = WING_COVER_IMAGES[wing.id] || wing.image;

              return (
                <ScrollReveal 
                  key={wing.id} 
                  variant="fadeUp" 
                  delay={0.1 + idx * 0.08}
                >
                  <div 
                    className={`wing-showcase-card ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedWing(wing)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select and view details for ${wing.title}`}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedWing(wing); }}
                  >
                    <div className="wing-showcase-img-wrap">
                      <img 
                        src={coverImg} 
                        alt={wing.title} 
                        className="wing-showcase-img"
                        loading="lazy"
                      />
                      <div className="wing-showcase-overlay" />
                    </div>

                    <div className="wing-showcase-top">
                      <span className="wing-showcase-age-badge">
                        AGES {wing.ageGroup}
                      </span>
                      <span className="wing-showcase-indicator" />
                    </div>

                    <div className="wing-showcase-bottom">
                      <h3 className="wing-showcase-title">{wing.title}</h3>
                      <span className="wing-showcase-grades">{wing.grades}</span>
                      <div className="wing-showcase-cta">
                        <span>{isSelected ? 'Currently Viewing' : 'Explore Stage'}</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Modern Editorial Bento Spotlight for Selected Wing */}
          <div className="wing-spotlight-bento-card">
            <ScrollReveal variant="fadeUp" delay={0.1} key={selectedWing.id}>
              
              {/* 1. Aligned Spotlight Header Bar */}
              <div className="wing-bento-top-bar">
                <div className="wing-bento-title-group">
                  <div className="wing-bento-tag-line">
                    <span className="wing-bento-stage-tag">
                      {selectedWing.grades} • AGES {selectedWing.ageGroup}
                    </span>
                  </div>
                  <h3 className="wing-bento-main-title">{selectedWing.title}</h3>
                  <p className="wing-bento-tagline">“{selectedWing.subtitle}”</p>
                </div>

                <div className="wing-bento-pills-row">
                  {selectedWing.timings && (
                    <span className="wing-bento-meta-pill">
                      <Clock size={14} className="wing-bento-pill-icon" />
                      <span>{selectedWing.timings}</span>
                    </span>
                  )}
                  {selectedWing.ratio && (
                    <span className="wing-bento-meta-pill">
                      <Users size={14} className="wing-bento-pill-icon" />
                      <span>{selectedWing.ratio}</span>
                    </span>
                  )}
                  <span className="wing-bento-meta-pill highlight">
                    <Sparkles size={14} className="wing-bento-pill-icon" />
                    <span>CBSE &amp; NEP 2020</span>
                  </span>
                </div>
              </div>

              {/* 2. Main Balanced Bento Split Grid */}
              <div className="wing-bento-grid">
                
                {/* Left Column: Narrative, Key Highlights List, Actions */}
                <div className="wing-bento-left-col">
                  <p className="wing-bento-desc-p">{selectedWing.description}</p>

                  {/* Key Highlights Uniform List */}
                  <div className="wing-bento-highlights-block">
                    <div className="wing-bento-highlights-title">
                      KEY WING HIGHLIGHTS:
                    </div>
                    <div className="wing-highlights-list">
                      {selectedWing.keyFeatures.map((f, fIdx) => (
                        <div key={fIdx} className="wing-highlight-item">
                          <div className="wing-highlight-icon-wrap">
                            <CheckCircle size={15} />
                          </div>
                          <span className="wing-highlight-text">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="wing-bento-actions-row">
                    <button 
                      type="button"
                      className="btn-enquire" 
                      onClick={(e) => handleNavigateToWing(e, selectedWing.id)}
                      style={{ padding: '0.85rem 1.85rem', fontSize: '0.92rem' }}
                    >
                      Explore Dedicated {selectedWing.title} Page <ArrowRight size={16} />
                    </button>
                    <button 
                      type="button"
                      className="btn-outline-gold" 
                      onClick={onOpenEnquiry}
                      style={{ padding: '0.85rem 1.85rem', fontSize: '0.92rem' }}
                    >
                      Enquire for Admission
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Frame + Curriculum Framework Box */}
                <div className="wing-bento-right-col">
                  <div className="wing-bento-image-wrapper">
                    <img 
                      src={WING_COVER_IMAGES[selectedWing.id] || selectedWing.image} 
                      alt={selectedWing.title} 
                      loading="lazy"
                      className="wing-bento-hero-img"
                    />
                    <div className="wing-bento-img-overlay" />
                    
                    <div className="wing-bento-floating-top">
                      <span className="wing-bento-campus-badge">
                        GD Goenka Ayodhya Campus
                      </span>
                    </div>

                    <div className="wing-bento-floating-bottom">
                      <div className="wing-bento-floating-title">{selectedWing.title}</div>
                      <div className="wing-bento-floating-meta">
                        {selectedWing.grades} • {selectedWing.ratio || 'Individual Mentorship'}
                      </div>
                    </div>
                  </div>

                  {/* Curriculum Architecture & Pedagogy Card */}
                  {selectedWing.curriculumHighlight && (
                    <div className="wing-bento-framework-box">
                      <div className="wing-bento-framework-header">
                        <BookOpen size={16} className="wing-bento-framework-icon" />
                        <span>CURRICULUM ARCHITECTURE &amp; PEDAGOGY</span>
                      </div>
                      <p className="wing-bento-framework-text">
                        {selectedWing.curriculumHighlight}
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* 4. Sub-Grades Progressive Learning Breakdown */}
              {selectedWing.detailedGrades && (
                <div className="wing-subgrades-section">
                  <div className="wing-subgrades-header">
                    <span className="wing-subgrades-tag">STAGE CHECKPOINTS</span>
                    <h4 className="wing-subgrades-heading">
                      Progressive Grade Milestones in {selectedWing.title}
                    </h4>
                  </div>

                  <div className="wing-subgrades-grid">
                    {selectedWing.detailedGrades.map((g, gIdx) => (
                      <div key={gIdx} className="wing-subgrade-card">
                        <div className="wing-subgrade-img-box">
                          <img 
                            src={g.image} 
                            alt={g.grade} 
                            loading="lazy"
                          />
                          <span className="wing-subgrade-badge-chip">{g.grade}</span>
                        </div>
                        <div className="wing-subgrade-body">
                          <h5 className="wing-subgrade-name">{g.grade}</h5>
                          <div className="wing-subgrade-focus">{g.focus}</div>
                          <p className="wing-subgrade-desc">{g.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 4. Final CTA */}
      <FinalCTA onOpenEnquiry={onOpenEnquiry} onOpenVisit={onOpenVisit} setCurrentRoute={setCurrentRoute} />
    </main>
  );
}
