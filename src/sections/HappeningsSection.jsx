import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { happeningsData } from '../data/happenings';
import { useSchoolData } from '../hooks/useSchoolData';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import './HappeningsSection.css';

export default function HappeningsSection({ setCurrentRoute }) {
  const { happenings } = useSchoolData();
  const currentHappenings = happenings || happeningsData;

  // 4 Featured Cards:
  // 0: Taekwondo Championship 2025 (Preserved Original Card)
  // 1: Digital English Language Lab (New Card from right-side content)
  // 2: Annual Athletic Meet 2025 (New Card from right-side content)
  // 3: Dandiya Night (New Card from right-side content)
  const slideshowCards = [
    currentHappenings[0],
    currentHappenings[1],
    currentHappenings[2],
    currentHappenings[3],
  ].filter(Boolean);

  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeCard = slideshowCards[activeCardIdx] || slideshowCards[0];
  const photos = activeCard?.images && activeCard.images.length > 0 
    ? activeCard.images 
    : [activeCard?.image];

  // Auto-play slideshow every 6s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveCardIdx((prev) => (prev + 1) % slideshowCards.length);
      setActivePhotoIdx(0);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slideshowCards.length]);

  const goToPrev = (e) => {
    e?.stopPropagation();
    setActiveCardIdx((prev) => (prev === 0 ? slideshowCards.length - 1 : prev - 1));
    setActivePhotoIdx(0);
  };

  const goToNext = (e) => {
    e?.stopPropagation();
    setActiveCardIdx((prev) => (prev + 1) % slideshowCards.length);
    setActivePhotoIdx(0);
  };

  const goToPhoto = (photoIdx, e) => {
    e?.stopPropagation();
    setActivePhotoIdx(photoIdx);
  };

  // Right-side list items: exactly the 3 clean cards from user's screenshot
  const rightSideItems = [
    { card: slideshowCards[1], cardIndex: 1 },
    { card: slideshowCards[2], cardIndex: 2 },
    { card: slideshowCards[3], cardIndex: 3 },
  ];

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
          {/* Left Column: Featured Card Slideshow */}
          <div 
            className="hap-featured-card hover-lift"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Image Box */}
            <div className="hap-image-container">
              <img 
                src={photos[activePhotoIdx % photos.length] || activeCard.image} 
                alt={activeCard.title} 
                className="hap-featured-img"
              />

              {/* Prev / Next navigation arrows */}
              <button 
                className="hap-nav-arrow hap-nav-prev" 
                onClick={goToPrev}
                aria-label="Previous story card"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                className="hap-nav-arrow hap-nav-next" 
                onClick={goToNext}
                aria-label="Next story card"
              >
                <ChevronRight size={22} />
              </button>

              {/* Multi-photo indicator if this card has multiple photos */}
              {photos.length > 1 && (
                <div className="hap-photo-dots">
                  {photos.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      className={`hap-photo-dot ${activePhotoIdx === pIdx ? 'active' : ''}`}
                      onClick={(e) => goToPhoto(pIdx, e)}
                      aria-label={`View photo ${pIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="hap-featured-content">
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: '700', marginBottom: '0.75rem' }}>
                <span>{activeCard.category}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
                  <Calendar size={14} /> {activeCard.date}
                </span>
                <div className="hap-card-indicator-dots" style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  {slideshowCards.map((_, cIdx) => (
                    <button
                      key={cIdx}
                      className={`hap-card-dot ${activeCardIdx === cIdx ? 'active' : ''}`}
                      onClick={() => { setActiveCardIdx(cIdx); setActivePhotoIdx(0); }}
                      aria-label={`Go to slide ${cIdx + 1}`}
                      title={slideshowCards[cIdx]?.title}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-display" style={{ fontSize: '1.85rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', lineHeight: 1.25 }}>
                {activeCard.title}
              </h3>

              <p className="text-body" style={{ marginBottom: '1.75rem', lineHeight: 1.6 }}>
                {activeCard.summary}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                <MagneticButton strength={4}>
                  <button 
                    className="btn-enquire"
                    onClick={() => { setCurrentRoute('/happenings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{ alignSelf: 'flex-start', padding: '0.65rem 1.35rem', fontSize: '0.85rem' }}
                    aria-label={`Read full feature: ${activeCard.title}`}
                  >
                    Read Full Feature <ArrowRight size={14} />
                  </button>
                </MagneticButton>

                {activeCardIdx !== 0 && (
                  <button
                    className="hap-back-taekwondo-btn"
                    onClick={() => { setActiveCardIdx(0); setActivePhotoIdx(0); }}
                    aria-label="Return to Taekwondo Card"
                  >
                    ← Back to Taekwondo Card
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Clean 3 Side Cards from original screenshot */}
          <div className="hap-side-list">
            {rightSideItems.map(({ card, cardIndex }) => {
              if (!card) return null;
              const isActive = activeCardIdx === cardIndex;
              return (
                <div 
                  key={card.id || cardIndex} 
                  className={`hap-side-item hover-lift ${isActive ? 'active-side-card' : ''}`}
                  onClick={() => { setActiveCardIdx(cardIndex); setActivePhotoIdx(0); }}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: '700', marginBottom: '0.5rem' }}>
                    <span>{card.category}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{card.date}</span>
                    {isActive && (
                      <span className="hap-active-pill" style={{ marginLeft: 'auto' }}>
                        NOW SHOWING
                      </span>
                    )}
                  </div>
                  <h4 className="font-display" style={{ fontSize: '1.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {card.title}
                  </h4>
                  <p className="text-small" style={{ color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.55 }}>
                    {card.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
