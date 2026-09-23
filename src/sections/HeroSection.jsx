import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Award, ChevronDown, ChevronLeft, ChevronRight, Compass, Sparkles, Monitor, Trophy } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import './HeroSection.css';

const HERO_SLIDES = [
  {
    id: 1,
    meta: '01 / 05 • ARCHITECTURAL GRANDEUR',
    tagline: 'Thrive. For Life.',
    titleLine1: 'WHERE HERITAGE',
    titleLine2: 'INSPIRES THE FUTURE.',
    leadText: 'A future-ready CBSE learning environment where curiosity, character, creativity, and confidence grow together in the cultural heartland of Ayodhya.',
    image: '/school-media/Opening Photos/campus_grand_exterior_banner.jpg',
    imageAlt: 'G.D. Goenka Public School Ayodhya Grand Campus Architecture & Grounds',
    badgeIcon: Award,
    badgeTitle: 'CBSE Curriculum',
    badgeSub: 'STEM, Leadership & Values Integration',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'enquiry' },
    ctaSecondary: { text: 'Explore Our School ↓', type: 'explore' }
  },
  {
    id: 2,
    meta: '02 / 05 • INNOVATION & DIGITAL FLUENCY',
    tagline: '1st in Ayodhya • Digital Language Lab',
    titleLine1: 'SHAPING MINDS',
    titleLine2: 'THROUGH TECHNOLOGY.',
    leadText: 'State-of-the-art multimedia workstations, phonetic listening booths, and digital coding labs empowering students with 21st-century fluency.',
    image: '/school-media/Digital Lab/lab_honeycomb_panorama.jpg',
    imageAlt: 'Modern Digital Language & Computer Science Laboratory at G.D. Goenka Ayodhya',
    badgeIcon: Monitor,
    badgeTitle: 'Digital Language Lab',
    badgeSub: 'Bilingual Workstations & Audio Booths',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'enquiry' },
    ctaSecondary: { text: 'Explore Academics →', type: 'route', route: '/academics' }
  },
  {
    id: 3,
    meta: '03 / 05 • ARTS & EXPRESSION',
    tagline: 'Timeless Grace • Self-Discovery',
    titleLine1: 'ROOTED IN CULTURE,',
    titleLine2: 'ELEVATED IN EXPRESSION.',
    leadText: 'From Indian classical dance and theatrical storytelling to inter-house music ensembles, student creativity takes center stage in Ayodhya.',
    image: '/school-media/Cultural Celebration/cultural_fest_dandiya_banner.jpg',
    imageAlt: 'Vibrant cultural and performing arts celebrations at G.D. Goenka School Ayodhya',
    badgeIcon: Sparkles,
    badgeTitle: 'Performing Arts',
    badgeSub: 'Classical Dance, Music & Heritage',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'enquiry' },
    ctaSecondary: { text: 'Experience Goenka →', type: 'route', route: '/experience' }
  },
  {
    id: 4,
    meta: '04 / 05 • EARLY YEARS DISCOVERY',
    tagline: 'Experiential Play • Reggio Emilia Inspired',
    titleLine1: 'WHERE JOYFUL CURIOSITY',
    titleLine2: 'MEETS NURTURING CARE.',
    leadText: 'Sensory color immersion, phonetic literacy picnics, and colorful indoor play zones designed for gentle social-emotional growth and exploration.',
    image: '/school-media/Play Station/kindergarten_ball_pool_landscape.jpg',
    imageAlt: 'Joyful toddler in the indoor kindergarten play station ball pit',
    badgeIcon: Compass,
    badgeTitle: 'Junior Wing',
    badgeSub: 'Foundational Play & Sensory Discovery',
    ctaPrimary: { text: 'Apply for Pre-Nursery →', type: 'enquiry' },
    ctaSecondary: { text: 'Schedule Campus Visit', type: 'visit' }
  },
  {
    id: 5,
    meta: '05 / 05 • VIBRANT CAMPUS LIFE',
    tagline: 'Experiential Days • Holistic Discovery',
    titleLine1: 'WHERE EVERY DAY',
    titleLine2: 'BECOMES A CELEBRATION.',
    leadText: 'From thematic color immersion days and balloon spectacles to district championship victories, joyful experiential growth flourishes in Ayodhya.',
    image: '/school-media/Blue Day/blue_day_celebration_banner.jpg',
    imageAlt: 'Joyful students celebrating experiential thematic learning day with blue balloons',
    badgeIcon: Sparkles,
    badgeTitle: 'Holistic Campus Life',
    badgeSub: 'Thematic Days, Athletics & Assemblies',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'enquiry' },
    ctaSecondary: { text: 'Explore Experience →', type: 'route', route: '/experience' }
  }
];

const AUTO_SLIDE_INTERVAL = 4500; // 4.5s automated slide interval

export default function HeroSection({ onOpenEnquiry, onOpenVisit, setCurrentRoute }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const timerRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automated slideshow timer with 4.5s interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, currentSlide]);

  // Preload all 5 full-screen banner images immediately
  useEffect(() => {
    HERO_SLIDES.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('introduction');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCtaClick = (cta) => {
    if (cta.type === 'enquiry') {
      if (onOpenEnquiry) onOpenEnquiry();
    } else if (cta.type === 'visit') {
      if (onOpenVisit) onOpenVisit();
    } else if (cta.type === 'explore') {
      scrollToExplore();
    } else if (cta.type === 'route' && cta.route) {
      if (setCurrentRoute) {
        setCurrentRoute(cta.route);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const slide = HERO_SLIDES[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section 
      className="hero-slider-section" 
      id="hero"
      aria-label="Campus Highlights Hero Slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides Stack */}
      <div className="hero-slider-bg-container">
        {HERO_SLIDES.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div 
              key={s.id} 
              className={`hero-slide-bg-item ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              <img 
                src={s.image} 
                alt={s.imageAlt}
                className="hero-slide-bg-img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="hero-slide-gradient-overlay" />
            </div>
          );
        })}
      </div>

      {/* Main Content Overlay */}
      <div className="container hero-slider-content-container">
        <div className="hero-slider-inner-content" key={slide.id}>
          {/* Header Meta / Tagline Pill */}
          <div className="hero-meta-row animate-hero-fade">
            <span className="hero-slide-meta-badge">
              <span className="hero-slide-pulse-dot" />
              {slide.meta}
            </span>
            <span className="hero-delhi-tagline">
              {slide.tagline}
            </span>
          </div>

          {/* Headline with Gold Accent */}
          <h1 className="hero-slider-title animate-hero-slide-up">
            <span className="hero-title-block">{slide.titleLine1}</span>
            <span className="hero-title-block hero-title-accent">{slide.titleLine2}</span>
          </h1>

          {/* Description */}
          <p className="hero-slider-lead animate-hero-fade-delay">
            {slide.leadText}
          </p>

          {/* Action CTAs */}
          <div className="hero-slider-cta-row animate-hero-slide-up-delay">
            <MagneticButton strength={5}>
              <button 
                className="btn-enquire hero-cta-btn-primary" 
                onClick={() => handleCtaClick(slide.ctaPrimary)}
                aria-label={slide.ctaPrimary.text}
              >
                {slide.ctaPrimary.text}
              </button>
            </MagneticButton>

            <MagneticButton strength={5}>
              <button 
                className="btn-menu-trigger hero-cta-btn-secondary" 
                onClick={() => handleCtaClick(slide.ctaSecondary)}
                aria-label={slide.ctaSecondary.text}
              >
                {slide.ctaSecondary.text}
              </button>
            </MagneticButton>
          </div>

          {/* Floating Key Highlight Badge */}
          <div className="hero-slide-feature-badge animate-hero-pop">
            <div className="hero-feature-icon-box">
              <BadgeIcon size={20} />
            </div>
            <div className="hero-feature-text-box">
              <h4 className="hero-feature-title">{slide.badgeTitle}</h4>
              <p className="hero-feature-sub">{slide.badgeSub}</p>
            </div>
          </div>
        </div>

        {/* Slider Controls: Arrow Nav & Slide Pagination */}
        <div className="hero-slider-bottom-bar">
          {/* Arrows */}
          <div className="hero-nav-arrows">
            <button 
              className="hero-arrow-btn" 
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="hero-arrow-btn" 
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Pagination Indicators with Elapsed Progress Bar */}
          <div className="hero-pagination-track">
            {HERO_SLIDES.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  className={`hero-pagination-item ${isActive ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${s.badgeTitle}`}
                >
                  <span className="hero-pagination-number">0{idx + 1}</span>
                  <span className="hero-pagination-bar">
                    <span 
                      className={`hero-pagination-fill ${isActive ? 'filling' : ''}`} 
                      style={{ animationDuration: `${AUTO_SLIDE_INTERVAL}ms` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Down Cue */}
          <div 
            className="hero-scroll-cue"
            onClick={scrollToExplore}
            role="button"
            aria-label="Scroll to introduction section"
          >
            <span>SCROLL</span>
            <ChevronDown size={15} className="scroll-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
}
