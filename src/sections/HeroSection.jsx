import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import KineticText from '../components/KineticText';
import KineticFlair from '../components/KineticFlair';
import './HeroSection.css';

const HERO_SLIDES = [
  {
    id: 1,
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'Nurturing confident, curious minds ready to thrive in an ever-changing world.',
    image: '/school-media/Opening Photos/campus_grand_exterior_banner.jpg',
    imageAlt: 'G.D. Goenka Public School Ayodhya Grand Campus Front View Architecture',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 2,
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'State-of-the-art multimedia workstations, phonetic listening booths, and digital coding labs empowering students with 21st-century fluency.',
    image: '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg',
    objectPosition: 'center bottom',
    imageAlt: 'Modern Digital Language & Computer Science Laboratory at G.D. Goenka Ayodhya',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 3,
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'From Indian classical dance and theatrical storytelling to inter-house music ensembles, student creativity takes center stage in Ayodhya.',
    image: '/school-media/Cultural Celebration/cultural_fest_dandiya_banner.jpg',
    imageAlt: 'Vibrant cultural and performing arts celebrations at G.D. Goenka School Ayodhya',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  },
  {
    id: 4,
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'Sensory color immersion, phonetic literacy picnics, and colorful indoor play zones designed for gentle social-emotional growth and exploration.',
    image: '/school-media/Play Station/kindergarten_ball_pool_landscape.jpg',
    imageAlt: 'Joyful toddler in the indoor kindergarten play station ball pit',
    ctaPrimary: { text: 'Apply for Pre-Nursery →', type: 'route', route: '/admissions' }
  },
  {
    id: 5,
    titleLine1: 'THRIVE',
    titleLine2: 'FOR LIFE',
    leadText: 'From thematic color immersion days and balloon spectacles to district championship victories, joyful experiential growth flourishes in Ayodhya.',
    image: '/school-media/Blue Day/blue_day_celebration_banner.jpg',
    imageAlt: 'Joyful students celebrating experiential thematic learning day with blue balloons',
    ctaPrimary: { text: 'Admissions 2026-27 →', type: 'route', route: '/admissions' }
  }
];

const AUTO_SLIDE_INTERVAL = 6500; // 6.5s automated slide interval (per PDF 1)

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
    if (cta.type === 'route' && cta.route) {
      if (setCurrentRoute) {
        setCurrentRoute(cta.route);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (cta.type === 'enquiry') {
      if (setCurrentRoute) {
        setCurrentRoute('/admissions');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (onOpenEnquiry) {
        onOpenEnquiry();
      }
    } else if (cta.type === 'visit') {
      if (onOpenVisit) onOpenVisit();
    } else if (cta.type === 'explore') {
      scrollToExplore();
    }
  };

  const slide = HERO_SLIDES[currentSlide];

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
                style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
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
          {/* Headline with Gold Accent & GSAP Character Bouncing */}
          <h1 className="hero-slider-title">
            <span className="hero-title-block">
              <KineticText 
                text={slide.titleLine1} 
                triggerKey={`${slide.id}-1`} 
                delay={0.06} 
                stagger={0.024}
              />
            </span>
            <span className="hero-title-block hero-title-accent">
              <KineticText 
                text={slide.titleLine2} 
                accent={true} 
                triggerKey={`${slide.id}-2`} 
                delay={0.22} 
                stagger={0.024}
              />
              <KineticFlair 
                type="star" 
                size={30} 
                className="hero-kinetic-star-flair"
                style={{ marginLeft: '0.75rem', verticalAlign: 'middle', display: 'inline-flex' }}
              />
            </span>
          </h1>

          {/* Description */}
          <p className="hero-slider-lead animate-hero-fade-delay">
            {slide.leadText}
          </p>

          {/* Action CTA */}
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
          </div>
        </div>
      </div>

      {/* Slider Controls: Arrow Nav & Slide Pagination (Fixed safely above bottom edge) */}
      <div className="hero-slider-bottom-bar-wrapper">
        <div className="container hero-slider-bottom-bar">
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
                  aria-label={`Go to slide ${idx + 1}`}
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
